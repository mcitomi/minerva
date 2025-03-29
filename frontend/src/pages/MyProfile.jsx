import { Container, Row, Col, Form, FloatingLabel, Button, Image, Modal, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import SuccessAlert from "../components/SuccessAlert.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

import CONFIG from "../config.json";

import "../styles/main.css";
import "../styles/myprofile.css";

export default ({ handleLogout, isLogged }) => {
    const fileInputRef = useRef(null);
    const defaultPfpUrl = "./assets/images/user.png";
    const [image, setImage] = useState(defaultPfpUrl);
    const [isImageSaved, setImageSaved] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            if(isLogged) {
                handleLogout();
            }
            navigate("/login");
            return;
        }
    }, [token, navigate]);

    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDeactivateModal, setDeactivateModal] = useState(false);
    const [showPasschangeModal, setPasschangeModal]= useState(false);

    function DeactivateModalAlert() {
        return (
            <Modal show={showDeactivateModal} onHide={() => setDeactivateModal(false)} style={{color: "black"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Biztos deaktiválja fiókját?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ez a művelet automatikusan kijelentkeztet a fiókodból.</p>
                    <p>A legközelebbi bejelentkezési kísérletkor kapni fog egy emailt, amivel újra aktiválhatja a fiókját.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setDeactivateModal(false)}>
                    Mégsem
                    </Button>
                    <Button variant="danger" onClick={deactivate}>
                    Biztos vagyok benne!
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function PasschangeModalAlert() {
        return (
            <Modal show={showPasschangeModal} onHide={() => setPasschangeModal(false)} style={{color: "black"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Biztos megváltoztatja a jelszavát?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ha igen, az emailben lévő gombra kattintva megteheti.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setPasschangeModal(false)}>
                    Mégsem
                    </Button>
                    <Button variant="danger" onClick={() => {
                        changepass(), 
                        setPasschangeModal(false)
                    }}>
                    Biztos vagyok benne!
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }


    // fájl kiválasztást kezeli
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    //kép frissítés
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 6 * 1024 * 1024) {
            setErrorMessage("A fájl mérete nem lehet nagyobb 6MB-nál.");
            setShowErrorAlert(true);
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file); // beolvassa a fájlt
            setImageSaved(false);
        }
    };

    const deactivate = async () => {
        try {
            const response = await fetch(`${CONFIG.API_URL}/user/deactivate`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                handleLogout();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changepass = async () => {
        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/password-request`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                } ,
                body: JSON.stringify({email: formData.email, verifyUrl: `${window.location.origin}`})
            });

            if(response.ok){
                setSuccessMessage("Ellenőrizze az email fiókját.");
                setShowSuccessAlert(true);
            }
            else{
                setErrorMessage("Próbálja újra később.");
                setShowErrorAlert(true);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const savePfp = async () => {
        try {
            setImageSaved(true);
            const response = await fetch(`${CONFIG.API_URL}/user/pfp`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "pfpBase64": image == defaultPfpUrl ? null : image
                })
            });

            if (!response.ok) {
                setErrorMessage("Hiba a profilkép feltöltése közben.");
                setShowErrorAlert(true);
                setImageSaved(false);
            } else {
                setSuccessMessage("Sikeres feltöltés.");
                setShowSuccessAlert(true);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        institution: "",
        country: "",
        language: "",
        classroom: ""
    });

    const [schools, setSchools] = useState([]);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    if(isLogged) {
                        handleLogout();
                    }
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    `${CONFIG.API_URL}/user/profile`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                if (response.status == 401 || response.status == 403) {
                    setErrorMessage("Lejárt a munkamenet. Jelentkezzen be újra.");
                    setShowErrorAlert(true);
                    if(isLogged) {
                        handleLogout();
                    }
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    setErrorMessage("Hiba az adatok lekérése közben!");
                    setShowErrorAlert(true);
                    return;
                }

                const data = await response.json();

                setFormData({
                    name: data.user.name,
                    email: data.user.email,
                    institution: data.user.institution,
                    // fun fact: a jelszót nem tárolhatod adatbázisban olyan formában, ami visszafejthető, ezért nem jeleníthető meg
                    // illetve ha nincs még beállítva pl az ország, akkor null értéket ad vissza az api, ezt is le kell kezelni
                    country: data.user.country,
                    language: data.user.language,
                    classroom: data.user.classroom,
                });
                setImage(data.user.pictureUrl || defaultPfpUrl);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }

        async function fetchSchools() {
            try {
                const response = await fetch(`${CONFIG.API_URL}/user/kreta/institutions`);

                if (!response.ok) {
                    setErrorMessage("Hiba az iskolák lekérdezésében!");
                    setShowErrorAlert(true);
                    return;
                }

                const data = await response.json();

                setSchools(data.map(school => (`${school.nev}, ${school.telepules}`)));
            } catch (err) {
                setError(err.message);
            }
        }

        fetchProfile();
        fetchSchools();
    }, []);

    function handleInput(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleClick(e) {
        e.preventDefault();
        setIsEdit(true);
    }

    async function saveUserDetails(e) {
        e.preventDefault();

        if (!isEdit) {
            return;
        }

        setIsEdit(false);

        try {
            const response = await fetch(`${CONFIG.API_URL}/user/details`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                setIsEdit(true);
                if(response.status == 406) {
                    setErrorMessage("Ne használj ilyen szavakat vagy karaktereket a nevedben!")
                    setShowErrorAlert(true);
                    return;
                }
                setErrorMessage("Hiba az adatok mentése közben.")
                setShowErrorAlert(true);
            } else {
                setSuccessMessage("Sikeresen feltöltve!");
                setShowSuccessAlert(true);
            }
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <Container fluid>
            {showDeactivateModal && <DeactivateModalAlert />}
            {showPasschangeModal && <PasschangeModalAlert/>}
            <Row style={{padding: 20}}>
                <Col xs={12} md={8} className="profileCard" style={{ backgroundColor: "#d3eefdc7", paddingTop: 30, paddingBottom: 30, color: "#212529", borderRadius:"30px"}}>
                    <h3 style={{ marginBottom: 30 }}>Adataim</h3>
                    <Form style={{borderRadius:"30px"}}>
                        <FloatingLabel controlId="floatingInput" label="Név" className="mb-3 floating-label">
                            <Form.Control type="name" name="name" placeholder="Név" value={formData.name} onChange={handleInput} disabled={!isEdit}></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Email-cím" className="mb-3 floating-label">
                            <Form.Control type="email" name="email" placeholder="Email-cím" value={formData.email} onChange={handleInput} disabled={true}></Form.Control>
                        </FloatingLabel>
                        {/* <FloatingLabel controlId="floatingInstitution" label="Intézmény" className="mb-3 floating-label"> */}
                        <AsyncSelect
                            className="mb-3 z-1"
                            placeholder="Válasszon egy intézményt"
                            name="institution"
                            value={
                                formData.institution
                                    ? { value: formData.institution, label: formData.institution }
                                    : null
                            }
                            loadOptions={(inputValue, callback) => {
                                const filtered = schools
                                    .filter((school) =>
                                        school.toLowerCase().includes(inputValue.toLowerCase())
                                    )
                                    .map((school) => ({ value: school, label: school }));
                                callback(filtered);
                            }}
                            onChange={(selectedOption) =>
                                handleInput({
                                    target: { name: "institution", value: selectedOption?.value || "" },
                                })
                            }
                            isDisabled={!isEdit}
                            isClearable
                        />
                        {/* </FloatingLabel> */}
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Ország" className="mb-3 floating-label z-0">
                                    <Form.Control type="text" name="country" placeholder="Ország" value={formData.country} onChange={handleInput} disabled={!isEdit}></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Nyelv" className="mb-3 floating-label z-0">
                                    <Form.Control type="text" name="language" placeholder="Nyelv" value={formData.language} onChange={handleInput} disabled={!isEdit}></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Osztály" className="mb-3 floating-label z-0">
                                    <Form.Control type="text" name="classroom" placeholder="Osztály" value={formData.classroom} onChange={handleInput} disabled={!isEdit}></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button variant="warning" type="button" style={{ marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px" }} className="mt-2" onClick={handleClick} disabled={isEdit}>Módosítás</Button>
                            <Button variant="success" type="button" style={{ marginLeft: 10, marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px", color: "black" }} className="mt-2" onClick={saveUserDetails} disabled={!isEdit}>Mentés</Button>
                            <Button variant="danger" type="button" style={{ marginRight: 10, marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px", color: "black" }} className="mt-2" onClick={() => setDeactivateModal(true)}>Deaktiválás</Button> 
                            <Button variant="danger" type="button" style={{ marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px", color: "black" }} className="mt-2" onClick={() => setPasschangeModal(true)}>Jelszó megváltoztatása</Button>
                        </div>
                        {showErrorAlert && <ErrorAlert title={"Sikertelen mentés!"} text={errorMessage} setOriginStatus={setShowErrorAlert} />}
                        {showSuccessAlert && <SuccessAlert title={"Sikeres mentés!"} text={successMessage} setOriginStatus={setShowSuccessAlert} />}
                    </Form>
                </Col>
                <Col xs={12} md={4} style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <h3 style={{ marginBottom: 30 }}>Profilképem</h3>
                    <div className="d-flex justify-content-center">
                        <div style={{ borderRadius: "50%", overflow: "hidden", width: "400px", height: "400px", border: "#699fcb 5px solid" }} className="mt-2 mb-2">
                            <Image src={image} alt="Profilkép" fluid style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                        </div>
                    </div>
                    <div className="text-center">
                        <Button variant="warning" type="submit" onClick={handleFileSelect} style={{ marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px" }} className="mt-2">Módosítás</Button>
                        <Button variant="success" type="submit" disabled={isImageSaved} onClick={savePfp} style={{ marginLeft: 10, marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px", color: "black" }} className="mt-2">Mentés</Button>
                        <Button variant="danger" type="submit" onClick={() => { setImage(defaultPfpUrl), setImageSaved(false) }} style={{ marginLeft: 10, marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px", color: "black" }} className="mt-2">Törlés</Button>
                    </div>
                </Col>
            </Row>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
            />
        </Container>
    );
}