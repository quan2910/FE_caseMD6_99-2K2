export default function CreateWallet() {
    return (
        <>
            <div style={{marginTop: 200}} className="about-me containerTemplate">
                <form action="forms/contact.php" method="post" role="form"
                      className="php-email-form mt-4 containerTemplate">

                    <div className=" form-group">
                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                               required/>
                    </div>

                    <div className=" form-group mt-3 mt-md-0">
                        <input type="email" className="form-control" name="email" id="email"
                               placeholder="Your Email" required/>
                    </div>

                    <div className="form-group mt-1">
                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject"
                               required/>
                    </div>
                    <div className="form-group mt-3">
                        <textarea className="form-control" name="message" rows={5} placeholder="Message" required
                                  defaultValue={""}/>
                    </div>
                    <div className="my-3">
                        <div className="loading">Loading</div>
                        <div className="error-message"/>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div className="text-center">
                        <button type="submit">Send Message</button>
                    </div>
                </form>
            </div>
        </>
    )
}