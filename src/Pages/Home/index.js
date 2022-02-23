import React, { useEffect } from "react";
import { Form, Label, FormGroup, Input, Button, Col, Table, Row } from "reactstrap";
import axios from 'axios';
//import { credentials } from '../../config/config'
import Select from "react-select";
import DownloadAsTextFile from "../../Components/TextDownloadFunction";
//var subscriptionKey = credentials.KEY
var endpoint = "http://localhost:3001/api";

//var location = credentials.LOCATION;

export default function Home() {
    const [data, setData] = React.useState({
        targetLanguages: ["fr", "it"],
        sourceLanguage: "en",
        key: "",
        location: ""
    });
    const [translatedText, setTranslatedText] = React.useState([]);
    const [toTranslate, setToTranslate] = React.useState([]);
    const [augmentedText, setAugmentedText] = React.useState([]);

    const languages = [
        { label: "Afrikaans", value: "af" },
        { label: "Albanian", value: "sq" },
        { label: "Amharic", value: "am" },
        { label: "Arabic", value: "ar" },
        { label: "Armenian", value: "hy" },
        { label: "Assamese", value: "as" },
        { label: "Azerbaijani", value: "az" },
        { label: "Bangla", value: "bn" },
        { label: "Bashkir", value: "ba" },
        { label: "Bosnian (Latin)", value: "bs" },
        { label: "Bulgarian", value: "bg" },
        { label: "Cantonese (Traditional)", value: "yue" },
        { label: "Catalan", value: "ca" },
        { label: "Chinese (Literary)", value: "lzh" },
        { label: "Chinese Simplified", value: "zh-Hans" },
        { label: "Chinese Traditional", value: "zh-Hant" },
        { label: "Croatian", value: "hr" },
        { label: "Czech", value: "cs" },
        { label: "Danish", value: "da" },
        { label: "Dari", value: "prs" },
        { label: "Divehi", value: "dv" },
        { label: "Dutch", value: "nl" },
        { label: "English", value: "en" },
        { label: "Estonian", value: "et" },
        { label: "Fijian", value: "fj" },
        { label: "Filipino", value: "fil" },
        { label: "Finnish", value: "fi" },
        { label: "French", value: "fr" },
        { label: "French (Canada)", value: "fr-ca" },
        { label: "Georgian", value: "ka" },
        { label: "German", value: "de" },
        { label: "Greek", value: "el" },
        { label: "Gujarati", value: "gu" },
        { label: "Haitian Creole", value: "ht" },
        { label: "Hebrew", value: "he" },
        { label: "Hindi", value: "hi" },
        { label: "Hmong Daw", value: "mww" },
        { label: "Hungarian", value: "hu" },
        { label: "Icelandic", value: "is" },
        { label: "Indonesian", value: "id" },
        { label: "Inuinnaqtun", value: "ikt" },
        { label: "Inuktitut", value: "iu" },
        { label: "Inuktitut (Latin)", value: "iu-Latn" },
        { label: "Irish", value: "ga" },
        { label: "Italian", value: "it" },
        { label: "Japanese", value: "ja" },
        { label: "Kannada", value: "kn" },
        { label: "Kazakh", value: "kk" },
        { label: "Khmer", value: "km" },
        { label: "Klingon", value: "tlh-Latn" },
        { label: "Klingon (plqaD)", value: "tlh-Piqd" },
        { label: "Korean", value: "ko" },
        { label: "Kurdish (Central)", value: "ku" },
        { label: "Kurdish (Northern)", value: "kmr" },
        { label: "Kyrgyz", value: "ky" },
        { label: "Lao", value: "lo" },
        { label: "Latvian", value: "lv" },
        { label: "Lithuanian", value: "lt" },
        { label: "Macedonian", value: "mk" },
        { label: "Malagasy", value: "mg" },
        { label: "Malay", value: "ms" },
        { label: "Malayalam", value: "ml" },
        { label: "Maltese", value: "mt" },
        { label: "Maori", value: "mi" },
        { label: "Marathi", value: "mr" },
        { label: "Mongolian (Cyrillic)", value: "mn-Cyrl" },
        { label: "Mongolian (Traditional)", value: "mn-Mong" },
        { label: "Myanmar", value: "my" },
        { label: "Nepali", value: "ne" },
        { label: "Norwegian", value: "nb" },
        { label: "Odia", value: "or" },
        { label: "Pashto", value: "ps" },
        { label: "Persian", value: "fa" },
        { label: "Polish", value: "pl" },
        { label: "Portuguese (Brazil)", value: "pt" },
        { label: "Portuguese (Portugal)", value: "pt-pt" },
        { label: "Punjabi", value: "pa" },
        { label: "Queretaro Otomi", value: "otq" },
        { label: "Romanian", value: "ro" },
        { label: "Russian", value: "ru" },
        { label: "Samoan", value: "am" },
        { label: "Serbian (Cyrillic)", value: "cr-Cyrl" },
        { label: "Serbian (Latin)", value: "sr-Latn" },
        { label: "Slovak", value: "sk" },
        { label: "Slovenian", value: "sl" },
        { label: "Spanish", value: "es" },
        { label: "Swahili", value: "sw" },
        { label: "Swedish", value: "sv" },
        { label: "Tahitian", value: "ty" },
        { label: "Tamil", value: "ta" },
        { label: "Tatar", value: "tt" },
        { label: "Telugu", value: "te" },
        { label: "Thai", value: "th" },
        { label: "Tibetan", value: "bo" },
        { label: "Tigrinya", value: "ti" },
        { label: "Tongan", value: "to" },
        { label: "Turkish", value: "tr" },
        { label: "Turkmen", value: "tk" },
        { label: "Ukrainian", value: "uk" },
        { label: "Urdu", value: "ur" },
        { label: "Uyghur", value: "ug" },
        { label: "Uzbek (Latin)", value: "uz" },
        { label: "Vietnamese", value: "vi" },
        { label: "Welsh", value: "cy" },
        { label: "Yucatec Maya", value: "yua" },
    ]


    useEffect(() => {
        getAugmentedText();
    }, [translatedText])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(endpoint, {
            targetLanguages: data.targetLanguages,
            sourceLanguage: data.sourceLanguage,
            key: data.key,
            location: data.location,
            data: toTranslate
        }).then((res) => {
            setTranslatedText(res.data)
        })
    }

    const setToTranslateData = (text) => {
        const lines = text.split("\n");
        var text = []

        lines.forEach(line => {
            text.push({ text: line })
        });
        setToTranslate(text);
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
            key: data.key,
            location: data.location,
            data: lines
        }).then((res) => {
            setAugmentedText(res.data)
        })
    }

    const displayResults = () => {
        if (translatedText != "" && augmentedText != "") {
            return (
                <>
                    <Form className="bg-light p-4">
                        <FormGroup>
                            <h5>Results</h5>
                            <Table hover>
                                <tbody>
                                    {augmentedText.map(item => {
                                        return (
                                            <tr><td>{item}</td></tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </FormGroup>
                        <FormGroup style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => DownloadAsTextFile(augmentedText,"results")}>Download as text</Button>
                        </FormGroup>
                    </Form>

                    <br />
                    <br />
                    <br />
                    <Form className="bg-light p-4">

                        <FormGroup>
                            <h5>Translations</h5>
                            <Table hover>
                                <tbody>
                                    {translatedText.map(item => {
                                        return (
                                            <tr><td>{item}</td></tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </FormGroup>
                        <FormGroup style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => DownloadAsTextFile(translatedText,"translatedText")}>Download as text</Button>
                        </FormGroup>
                    </Form>
                </>
            )
        }
    }

    return (
        <div className="container">
            <Col md="12" className="form">
                <Form className="bg-light p-4" onSubmit={handleSubmit}>
                    <h3 style={{ display: 'flex', justifyContent: 'center' }}>Text Data Augmentation</h3>
                    <br />
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="key">Azure Translate API Subscription Key</Label>
                                <Input name="key" id="key" onChange={(value) => setData({ ...data, key: value.target.value })}></Input>
                            </FormGroup>
                        </Col>

                        <Col md="6">
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input name="location" id="location" onChange={(value) => setData({ ...data, location: value.target.value })}></Input>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="sourceLanguage">Source Language</Label>
                                <Select name="sourceLanguage" id="sourceLanguage" options={languages} onChange={(value) => setData({ ...data, sourceLanguage: value.value })}></Select>
                            </FormGroup>
                        </Col>

                        <Col md="6">
                            <FormGroup>
                                <Label for="targetLanguages">Target Languages</Label>
                                <Select name="targetLanguages" id="targetLanguages" options={languages} onChange={(value) => setTargetLanguages(value)} isMulti></Select>
                            </FormGroup>
                        </Col>

                    </Row>
                    <FormGroup>
                        <Label for="translateText">Text to Translate</Label>
                        <Input type="textarea" name="translateText" id="translateText" onChange={(text) => setToTranslateData(text.target.value)} />
                    </FormGroup>
                    <FormGroup style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button>Submit</Button>
                    </FormGroup>
                </Form>

                <br />
                <br />
                {displayResults()}
            </Col>

        </div>

    )
}