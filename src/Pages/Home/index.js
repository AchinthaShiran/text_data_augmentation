import React, { useEffect } from "react";
import { Form, Label, FormGroup, Input, Button } from "reactstrap";
import axios from 'axios';
import { credentials } from '../../config/config'

var subscriptionKey = credentials.KEY
var endpoint = "http://localhost:3001/api";

var location = credentials.LOCATION;

export default function Home() {
    const [data, setData] = React.useState({
        targetLanguages: ["fr"],
        sourceLanguage: "en"
    });
    const [translatedText, setTranslatedText] = React.useState([]);
    const [toTranslate, setToTranslate] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(endpoint, {
            targetLanguages: data.targetLanguages,
            sourceLanguage: data.sourceLanguage,
            data: toTranslate
        }).then((res) => {
            setTranslatedText(res.data)
        })
    }

    useEffect(() => {
        // console.log(translatedText)
    }, [translatedText])

    const setToTranslateData = (data) => {
        const lines = data.split("\n");
        var data = []

        lines.forEach(line => {
            data.push({ text: line })
        });
        setToTranslate(data);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="translateText">Text to Translate</Label>
                    <Input type="textarea" name="translateText" id="translateText" onChange={(text) => setToTranslateData(text.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="sourceLanguage">Source Language</Label>
                    <Input type="text" name="sourceLanguage" id="sourceLanguage" placeholder="source language" />
                </FormGroup>
                <FormGroup>
                    <Label for="targetLanguages">Target Languages</Label>
                    <Input type="select" name="targetLanguages" id="targetLanguages" multiple>
                        <option>fr</option>
                        <option>it</option>
                        <option>sp</option>
                    </Input>
                </FormGroup>

                <Button>Submit</Button>
            </Form>

            <Form>
                <Input type="textarea" name="translateText" id="translateText" value={translatedText} />
            </Form>
        </>

    )
}