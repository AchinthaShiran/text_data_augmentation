import React, { useEffect } from "react";
import { Form, Label, FormGroup, Input, Button,Col } from "reactstrap";
import axios from 'axios';
import { credentials } from '../../config/config'
import Select from "react-select";

var subscriptionKey = credentials.KEY
var endpoint = "http://localhost:3001/api";

var location = credentials.LOCATION;

export default function Home() {
    const [data, setData] = React.useState({
        targetLanguages: ["fr", "it"],
        sourceLanguage: "en"
    });
    const [translatedText, setTranslatedText] = React.useState([]);
    const [toTranslate, setToTranslate] = React.useState([]);

    const languages = [
        {label:"English",value:"en"},
        {label:"French",value:"fr"},
        {label:"Italian",value:"it"},

    ]
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(toTranslate, data)
        axios.post(endpoint, {
            targetLanguages: data.targetLanguages,
            sourceLanguage: data.sourceLanguage,
            data: toTranslate
        }).then((res) => {
            setTranslatedText(res.data)
        })
    }

    useEffect(() => {
        console.log(data)
    }, [translatedText,data])

    const setToTranslateData = (data) => {
        const lines = data.split("\n");
        var data = []

        lines.forEach(line => {
            data.push({ text: line })
        });
        setToTranslate(data);
    }

    const handleTargetLanguages = (opts)=>{
        const langs = [];

        if (opts != null) {
            opts.forEach((option) => {
                langs.push(option.value)
            })

        }

      setData({...data,targetLanguages:langs})
    
    }

    return (
        <Col md="5">
            <Form className="bg-dark p-4" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="translateText">Text to Translate</Label>
                    <Input type="textarea" name="translateText" id="translateText" onChange={(text) => setToTranslateData(text.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="sourceLanguage">Source Language</Label>
                    <Select name="sourceLanguage" id="sourceLanguage" placeholder="sourceLanguage" options={languages} oonChange={value=>setData({...data,sourceLanguage:value.target.value})}></Select>
                </FormGroup>
                <FormGroup>
                    <Label for="targetLanguages">Target Languages</Label>
                   
                    <Select name="targetLanguages" id="targetLanguages" placeholder="targetLanguages" options={languages} onChange={(value) => handleTargetLanguages(value)} isMulti></Select>

                </FormGroup>

                <Button>Submit</Button>
            </Form>

            <Form>
                <Input type="textarea" name="translateText" id="translatedText" value={translatedText} />
            </Form>
        </Col>

    )
}