import Private from "../../components/auth/private"
import Layout from "../../components/Layout"
const UserIndex = () =>{
    return(
        <Layout>
        <Private>
        <h2>User Dashboard</h2>
        </Private>
        </Layout>
    )
}
export default UserIndex