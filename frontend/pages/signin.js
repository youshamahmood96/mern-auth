import SignupComponent from "../components/auth/SignupComponent"
import Layout from "../components/Layout"
const Signin = () =>{
    return(
      <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-4">
        <SignupComponent></SignupComponent>
        </div>
      </div>
    </Layout>
    )
}
export default Signin