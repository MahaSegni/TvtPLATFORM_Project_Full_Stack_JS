import styled from "styled-components";
import { useEffect, useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../../assets/css/evaluations.css"

export default function AddEvaluation({ props, add, reload }) {
    const history = useHistory();
    const [showModules, setShowModules] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [modules, setModules] = useState();
    const [typeQuestion, settypeQuestion] = useState("satisfaction");
    const [first, setFirst] = useState("Very satisfied");
    const [second, setSecond] = useState("Satisfied");
    const [third, setThird] = useState("Neutral");
    const [fourth, setFourth] = useState("Dissatisfied");
    const [fifth, setFifth] = useState("Very dissatisfied");
    useEffect(() => {
        if (typeQuestion === "importance") { setFirst("Strongly important"); setSecond("important"); setThird("Neutral"); setFourth("Not important"); setFifth("Not important at all"); }
        else if (typeQuestion === "agreement") { setFirst("Strongly agree"); setSecond("Agree"); setThird("Neutral"); setFourth("Disagree"); setFifth("Strongly disagree"); }
        else if (typeQuestion === "utility") { setFirst("Very useful"); setSecond("Useful"); setThird("Neutral"); setFourth("Not useful"); setFifth("Not useful at all"); }
        else { setFirst("Very satisfied"); setSecond("Satisfied"); setThird("Neutral"); setFourth("Dissatisfied"); setFifth("Very dissatisfied"); }
    });
    const [formData, setFormData] = useState({
        type: "",
        message: "",
        visibility: "",
        idModule:""
    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleChange = (e) => {
        settypeQuestion(e.target.value);
        onChange(e)
    };

    const handleChangeModule = (e) => {
        setShowForm(true)
        onChange(e)
    };

    const handleChangeVisibility = async (e) => {
     
        if (e.target.value == "site") {
            setShowModules(false)
            setShowForm(true);
            onChange(e)
        }
        else if (e.target.value == "module") {
            setShowForm(false)
            setShowModules(true)
            await axios.get('http://localhost:3000/api/module/get').then(res => { setModules(res.data) })
        }
    };



    


    const onAdd = async (e) => {
        e.preventDefault();
        const [result, err] = await queryApi('chatbot/add/', formData, "POST", false);
        reload();
        add(false);
    }


    const { type, message } = formData;

    return (
        <div class="card-body">
            <div className="body">
                <form class="w-75 mx-auto" onSubmit={onAdd}>
                    <h5 style={{ color: "red" }}></h5>
                    <select class="form-control"  name="visibility" onChange={handleChangeVisibility} >
                        <option value="site">Site</option>
                        <option value="module">Module</option>
                    </select>

                    <br />
                    {showModules &&
                        <select class="form-control"  name="idModule" onChange={handleChangeModule} >
                            {modules&& modules.map((module, index) => (  <option key={index} value={module._id}>{module.label}</option>))}
                        </select>
                    }

                    <br />
                    {showForm &&
                        <>
                            <div class="form-group">
                                <label id="inputAddQuestion" style={{ float: "left" }}><h5>Question:</h5></label>
                                <input type="text" class="form-control"
                                    name="message"
                                    onChange={(e) => onChange(e)} />
                            </div>
                            <br />
                            <div class="form-group">
                                <label style={{ float: "left" }}><h5>Type:</h5></label>
                                <br />
                                <select class="form-control" value={typeQuestion} name="type" onChange={handleChange} id="selectAddQuestion">
                                    <option value="satisfaction">Satisfaction</option>
                                    <option value="importance">Importance</option>
                                    <option value="agreement">Agreement</option>
                                    <option value="utility">Utility</option>
                                </select>
                            </div>
                            <br />
                            <h5 class="pull-left"><span class="bi bi-emoji-laughing" style={{ color: "#4AB70E" }}> </span>{first}</h5><br />
                            <h5 class="pull-left"><span class="bi bi-emoji-smile" style={{ color: "#7BCA52" }}> </span>{second}</h5><br />
                            <h5 class="pull-left"><span class="bi bi-emoji-neutral" style={{ color: "#FFBF32" }}> </span>{third}</h5><br />
                            <h5 class="pull-left"><span class="bi bi-emoji-frown" style={{ color: "#EC611F" }}> </span>{fourth}</h5><br />
                            <h5 class="pull-left"><span class="bi bi-emoji-angry" style={{ color: "	#8B0000" }}> </span>{fifth}</h5><br />

                            <h5 style={{ color: "red" }}></h5>
                            <h5 style={{ textAlign: "center", color: "red" }}></h5></>}
                    <div className="mt-3">
                        <button className="btn get-started-btn" id="cancelBtn" type="reset" data-toggle="collapse" data-target="#collapseOne">Cancel</button>
                        <button type="submit" className="btn get-started-btn" data-toggle="collapse" data-target="#collapseOne" disabled={!showForm}>Submit</button>
                    </div>
                </form >
            </div>
        </div>

    );
}