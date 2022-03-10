import React from "react";
import { useForm } from "react-hook-form";
import "./styleCard.css";

const AjouterCour = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div class="post-content">
        <div class="post-container">
        <div class="post-detail">
        <form onSubmit={handleSubmit(onSubmit)}>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input class="form-control" defaultValue="test" {...register("example")} />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input class="form-control" defaultValue="test" {...register("example")} />
  </div>
  <div class="line-divider"></div>

  <button type="submit" class="btn get-started-btn">Submit</button>
</form>
       
        </div>
        </div></div>
      );
   

}
export default AjouterCour; 