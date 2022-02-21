import React, { useEffect } from "react";
import { Form, Label, FormGroup, Input, Button, Col, Table } from "reactstrap";
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
    const [augmentedText, setAugmentedText] = React.useState([]);

    const languages = [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "Italian", value: "it" },
    ]


    useEffect(() => {
        getAugmentedText();
    }, [translatedText])

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

    const setToTranslateData = (data) => {
        const lines = data.split("\n");
        var data = []

        lines.forEach(line => {
            data.push({ text: line })
        });
        setToTranslate(data);
    }

    const setTargetLanguages = (opts) => {
        const langs = [];

        if (opts != null) {
            opts.forEach((option) => {
                langs.push(option.value)
            })

        }
        setData({ ...data, targetLanguages: langs })
    }

    const getAugmentedText = () => {
        var lines = []
        translatedText.forEach(line => {
            lines.push({ text: line })
        });

        axios.post(endpoint, {
            targetLanguages: data.sourceLanguage,
            sourceLanguage: '',
            data: lines
        }).then((res) => {
            setAugmentedText(res.data)
        })
    }

    return (
        <Col md="10">
            <Form className="bg-light p-4" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="translateText">Text to Translate</Label>
                    <Input type="textarea" name="translateText" id="translateText" onChange={(text) => setToTranslateData(text.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="sourceLanguage">Source Language</Label>
                    <Select name="sourceLanguage" id="sourceLanguage" placeholder="sourceLanguage" options={languages} oonChange={value => setData({ ...data, sourceLanguage: value.target.value })}></Select>
                </FormGroup>
                <FormGroup>
                    <Label for="targetLanguages">Target Languages</Label>
                    <Select name="targetLanguages" id="targetLanguages" placeholder="targetLanguages" options={languages} onChange={(value) => setTargetLanguages(value)} isMulti></Select>
                </FormGroup>
                <FormGroup>
                    <Button>Translate</Button>
                </FormGroup>

            </Form>

            <Form className="bg-light p-4">
                <FormGroup>
                    <Table striped>
                        <th>Results</th>
                        {augmentedText.map(item => {
                            return (
                                <tr>{item}</tr>
                            )
                        })}
                    </Table>
                </FormGroup>

                <FormGroup>
                    <Table striped>
                        <th>Translations</th>
                        {translatedText.map(item => {
                            return (
                                <tr>{item}</tr>
                            )
                        })}
                    </Table>
                </FormGroup>
            </Form>
        </Col>

    )
}