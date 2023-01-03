import CreateCategory from "../category/CreateCategory";

export default function ListWallet() {
    return (
        <>
            <div className="row" style={{marginLeft: 180}}>
                <button style={{width: 200, marginBottom: 20, marginLeft: 12, background: "rgb(255, 174, 129)"}}>
                    <CreateCategory></CreateCategory>
                </button>

                <div className="col-lg-12">
                    <table className="table table-striped"
                           style={{background: "rgb(255, 174, 129)", width: 1000, borderRadius: "1%"}}>
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Name Category</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )


}