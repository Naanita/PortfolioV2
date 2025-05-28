const Test = () => {
    return (
        <div style={{ height: "100vh", margin: 0, padding: 0 }}>
            <h1>Test Component</h1>
            <p>This is a simple React component.</p>
            <iframe
                src="https://www.tiktok.com/embed/7498116270617857335"
                width="100%"
                height="100%"
                // style={{ border: "none", minHeight: "400px", flex: 1 }}
                allowFullScreen
                scrolling="no"
                title="TikTok Video"
            ></iframe>
        </div>
    );
};

export default Test;
