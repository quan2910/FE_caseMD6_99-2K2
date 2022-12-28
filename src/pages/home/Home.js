export default function Home() {
    return (
        <>
            {/* ======= About Me ======= */}
            <div style={{marginTop: 150}} className="about-me container">
                <div className="section-title">
                    <h2>About</h2>
                    <p>Learn more about me</p>
                </div>
                <div className="row">
                    <div className="col-lg-4" data-aos="fade-right">
                        <img src="assets/img/me.jpg" className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                        <h3>UI/UX &amp; Graphic Designer</h3>
                        <p className="fst-italic">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua.
                        </p>
                        <div className="row">
                            <div className="col-lg-6">
                                <ul>
                                    <li><i className="bi bi-chevron-right" /> <strong>Birthday:</strong> <span>1 May 1995</span></li>
                                    <li><i className="bi bi-chevron-right" /> <strong>Website:</strong> <span>www.example.com</span></li>
                                    <li><i className="bi bi-chevron-right" /> <strong>Phone:</strong> <span>+123 456 7890</span></li>
                                    <li><i className="bi bi-chevron-right" /> <strong>City:</strong> <span>New York, USA</span></li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul>
                                    <li><i className="bi bi-chevron-right" /> <strong>Age:</strong> <span>30</span></li>
                                    <li><i className="bi bi-chevron-right" /> <strong>Degree:</strong> <span>Master</span></li>
                                    <li><i className="bi bi-chevron-right" /> <strong>PhEmailone:</strong> <span>email@example.com</span></li>
                                    <li><i className="bi bi-chevron-right" /> <strong>Freelance:</strong> <span>Available</span></li>
                                </ul>
                            </div>
                        </div>
                        <p>
                            Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis.
                            Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.
                        </p>
                    </div>
                </div>
            </div>{/* End About Me */}
        </>
    )
}