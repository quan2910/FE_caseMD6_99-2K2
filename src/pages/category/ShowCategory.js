import CreateCategory from "./CreateCategory";

export default function ShowCategory() {
    return (
        <div className="row">
            <CreateCategory/>
            <div className="col-lg-12">
                <table className="table table-striped" style={{background:"linear-gradient(to right, #FF4B2B, #FF416C)", width:1000}}>
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Time</th>
                        <th scope="col">Total Spent</th>
                        <th scope="col">Name Category</th>
                        <th scope="col">Note</th>
                    </tr>
                    </thead>
                    <tbody>
                       <tr>
                            <th scope="row">a</th>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}