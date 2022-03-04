export default function Signup() {
    return (
            <div class="my-5">
                <h1 class="logo mx-auto" style={{textAlign:"center",color:"#5fcf80"}}>Sign Up</h1>
                <form class="w-50 mx-auto" action="signin.html">
                    <div class="form-group">
                        <label for="name" class="me-auto">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Name" />
                    </div>
                    <div class="form-group">
                        <label for="lname">Last Name</label>
                        <input type="text" class="form-control" id="lname" placeholder="Enter Last Name" />
                    </div>
                    <div class="form-group">
                        <label for="bdate">Birth Date</label>
                        <input type="date" class="form-control" id="bdate" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword1">Password</label>
                        <input type="password" class="form-control" id="confirmPassword1" placeholder="Confirm your Password" />
                    </div>
                    <button type="submit" class="ms-auto my-2 btn get-started-btn">Submit</button>
                </form>
            </div>
    );
}