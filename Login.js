import React,{Component} from 'react'
import axios from 'axios';
class Login extends Component{
  state = {
     
      email:'',
      password:'',
      errors:{}
  }

   handleChange = e => {
       this.setState({
       [e.target.name]:e.target.value
       });
   };
    handleSubmit = e =>{
        e.preventDefault();
        const newUser = {
            
            email:this.state.email,
            password:this.state.password
        };
        axios.post("/api/users/login",newUser)
        .then(res=>this.props.history.push('/dashboard'));
    };
    render(){
       const{email,password,errors} = this.state;
        return(
            <React.Fragment>
                <div className="container">
               <div className="row">
              <div className="col-md-8 m-auto">
                  <h2 className="mt-5 text-center mb-0">Login</h2>
              <p className="text-lead text-center">login your account</p>
              <form onSubmit={this.handleSubmit}>
 
               
               <div className="form-group">
               <input
               type="email"
               name="email"
               value={email}
               onChange={this.handleChange}
               className="form-control"
               placeholder="enter your email"
              /> 
               </div>
               <div className="form-group">
               <input
               type="password"
               name="password"
               value={password}
               onChange={this.handleChange}
               className="form-control"
               placeholder="enter your password"
              /> 
               </div>
               <input type="submit" className="btn btn-primary justify-content-center d-flex w-100 " value="Login"/>
              </form>
              </div>
               </div>
                </div>
            </React.Fragment>
        );
    }
    
};

export default Login 