import "../../style/style.css"
import {useSelector} from "react-redux";

export default function Home() {
    const user = useSelector(state => {
        console.log(state)
        return state.user.currentUser.user.authenticUser[0]
    })
    return (
        <>
            {/* ======= About Me ======= */}
            <div style={{marginTop: 150}} className="about-me containerTemplate">
                <div className="section-title" style={{marginLeft: 130}}>
                    <p>{user.username}</p>
                </div>
                <div className="row">
                    <div className="col-lg-4" data-aos="fade-right">
                        <img src="assets/img/me.jpg" className="img-fluid" alt=""/>
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                        <h3>Tên ví</h3>
                        <div className="col-lg-6">
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <strong>Chi</strong></li>
                                <li><i className="bi bi-chevron-right"></i> <strong>Thu</strong></li>
                            </ul>
                        </div>
                        <p className="fst-italic">
                            Tổng tiền
                        </p>
                        <div className="row">
                            <div className="col-lg-12">
                                <table className="table table-dark table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Note</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Total Spent</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <h2>Biểu đồ</h2>
                            </div>
                            <div className="col-lg-6">
                                <h2>Cũng là biểu đồ</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End About Me */}
        </>
    )
}