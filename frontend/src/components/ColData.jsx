export default ({ title, paragraph }) => {
    return (
        <>
            <div>
                <h2 style={{marginBottom: 30}}>{title}</h2>
                <p style={{paddingLeft: 10, paddingRight: 10}}>{paragraph}</p>
            </div>
        </>
    );
}