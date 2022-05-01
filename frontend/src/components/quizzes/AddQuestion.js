import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Switch from '@mui/material/Switch';
import AddOption from "./AddOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import CodeEditor from '@uiw/react-textarea-code-editor';

/**
 
  Questions: {
    type: [
        {
          texte: String,
          QuestionType:String,

          Responses: {
              type:
            [{
                texte:String,
                correct:Boolean,
                idUsers:[String],


              }]
          },
        }
      ],
  },
 */
const schema = yup.object({
  texte: yup.string().required(),

}).required();

const AddQuestion = ({ AddQuestionEvent }) => {

  const [responses, setResponses] = useState([]);
  const [Errorinoptions, setErrorinoptions] = useState(false);
  const [ErrorinoptionsMsg, setErrorinoptionsMsg] = useState("")
  const [insertCode, setInsertCode] = useState(false);
  const [code, setCode] = useState("");
  const [language, setlanguage] = useState("c");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  function AddOptionfn(texte, correct) {
    setResponses([...responses, { texte, correct }]);
  }

  const onSubmit = (data) => {
    if (responses.filter((e) => e.correct == true).length == 0) {
      setErrorinoptions(true);
      setErrorinoptionsMsg("Question must have at least one Correct Answer");

    } else if ((data.QuestionType == "Radio" || data.QuestionType == "Select") && (responses.filter((e) => e.correct == true).length > 1)) {
      setErrorinoptions(true);
      setErrorinoptionsMsg("This Type of Question must have only one Correct Answer ");
    } else {
      setErrorinoptions(false);
      setErrorinoptionsMsg(" ");
      
      AddQuestionEvent(data, responses,code,language)
  
      setResponses([])
      setInsertCode(false);
      setCode("");
      setlanguage("c");
      reset();
    }
  }
  function deleterep(index) {
    console.log(index);
    console.log(responses)
    setResponses([
      ...responses.slice(0, index),
      ...responses.slice(index + 1)
    ]);

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div class="form-group my-3">
        <input type="text" class="form-control" id="title" {...register("texte")} placeholder="texte " />
      </div>
      <div class="alert alert-danger" role="alert" hidden={!errors.texte}>
        {errors.texte?.message}
      </div>
      <div class="form-group my-3">
        {insertCode == false && <a className="btn btn-secondary" onClick={() => setInsertCode(true)}>Insert Code block</a>}

        {insertCode &&
        <div>
          <a className="btn btn-danger col-2 me-2 my-3" onClick={() => setInsertCode(false)}>Close editor</a>
          <a className="btn btn-secondary col-2 me-2 my-3" onClick={() => setCode("")}>Clear editor</a>
          <select class="btn btn-light col-5" onChange={(e)=>setlanguage(e.target.value)}>
          <option value="c">Language: c</option>
          <option value="abap">Language: abap</option>
          <option value="aes">Language: aes</option>
          <option value="apex">Language: apex</option>
          <option value="azcli">Language: azcli</option>
          <option value="bat">Language: bat</option>
          <option value="brainfuck">Language: brainfuck</option>
          <option value="cameligo">Language: cameligo</option>
          <option value="clike">Language: clike</option>
          <option value="clojure">Language: clojure</option>
          <option value="coffeescript">Language: coffeescript</option><option value="cpp">Language: cpp</option><option value="csharp">Language: csharp</option><option value="csp">Language: csp</option><option value="css">Language: css</option><option value="dart">Language: dart</option><option value="dockerfile">Language: dockerfile</option><option value="erlang">Language: erlang</option><option value="fsharp">Language: fsharp</option><option value="go">Language: go</option><option value="graphql">Language: graphql</option><option value="handlebars">Language: handlebars</option><option value="hcl">Language: hcl</option><option value="html">Language: html</option><option value="ini">Language: ini</option><option value="java">Language: java</option><option value="javascript">Language: javascript</option><option value="json">Language: json</option><option value="jsx">Language: jsx</option><option value="julia">Language: julia</option><option value="kotlin">Language: kotlin</option><option value="less">Language: less</option><option value="lex">Language: lex</option><option value="livescript">Language: livescript</option><option value="lua">Language: lua</option><option value="markdown">Language: markdown</option><option value="mips">Language: mips</option><option value="msdax">Language: msdax</option><option value="mysql">Language: mysql</option><option value="nginx">Language: nginx</option><option value="objective-c">Language: objective-c</option><option value="pascal">Language: pascal</option><option value="pascaligo">Language: pascaligo</option><option value="perl">Language: perl</option><option value="pgsql">Language: pgsql</option><option value="php">Language: php</option><option value="plaintext">Language: plaintext</option><option value="postiats">Language: postiats</option><option value="powerquery">Language: powerquery</option><option value="powershell">Language: powershell</option><option value="pug">Language: pug</option><option value="python">Language: python</option><option value="r">Language: r</option><option value="razor">Language: razor</option><option value="redis">Language: redis</option><option value="redshift">Language: redshift</option><option value="restructuredtext">Language: restructuredtext</option><option value="ruby">Language: ruby</option><option value="rust">Language: rust</option><option value="sb">Language: sb</option><option value="scala">Language: scala</option><option value="scheme">Language: scheme</option><option value="scss">Language: scss</option><option value="shell">Language: shell</option><option value="sol">Language: sol</option><option value="sql">Language: sql</option><option value="st">Language: st</option><option value="stylus">Language: stylus</option><option value="swift">Language: swift</option><option value="systemverilog">Language: systemverilog</option><option value="tcl">Language: tcl</option><option value="toml">Language: toml</option><option value="tsx">Language: tsx</option><option value="twig">Language: twig</option><option value="typescript">Language: typescript</option><option value="vb">Language: vb</option><option value="vbscript">Language: vbscript</option><option value="verilog">Language: verilog</option><option value="vue">Language: vue</option><option value="xml">Language: xml</option><option value="yaml">Language: yaml</option>
          </select>
          <CodeEditor
          
        value={code}
        language={language}
        placeholder={"Please enter "+ language +" code."}
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
        }}
      /></div>
        }
      </div>
      <div class="form-group my-3">
        <select class="form-control" {...register("QuestionType")}>
          <option value="CheckBox">CheckBox</option>
          <option value="Radio">Radio</option>
          <option value="Select">Select</option>
        </select>
        <div />

        <div class="col-9 ms-2 my-2">
          {responses.length > 0 &&
            <h6 class="my-2">Options </h6>}
          {responses &&

            responses.map((reponse, index) => (
              <div class="row" key={index}>
                <p class="col-8">{reponse.texte}</p>
                {reponse.correct == true &&
                  <p class="col-3">Correct Answer </p>
                }
                {reponse.correct == false &&
                  <p class="col-3">False Answer</p>
                }
                <a class="col" ><FontAwesomeIcon style={{ color: "red" }} icon={faMinusCircle} onClick={() => deleterep(index)} /> </a>


              </div>


            ))
          }

        </div>
        <h6 class="my-2">Add Options </h6>

        <AddOption AddOptionfn={AddOptionfn} />
        {Errorinoptions == true &&
          <div class="alert alert-danger" role="alert" >
            {ErrorinoptionsMsg}
          </div>
        }

      </div>
      <div className="form-group my-3">
        <input type="submit" value="Save" className="form-control btn btncustom " />
      </div>

    </form>

  );
}
export default AddQuestion; 