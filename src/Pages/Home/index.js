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

    const displayResults = () => {
        if (translatedText != "" && augmentedText != "") {
            return (
                <Form className="bg-light p-4">
                    <FormGroup>
                        <Table hover>
                            <th>Results</th>
                            <tbody>
                                {augmentedText.map(item => {
                                    return (
                                        <tr><td>{item}</td></tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </FormGroup>

                    <FormGroup>
                        <Table hover>
                            <th>Translations</th>
                            <tbody>
                                {translatedText.map(item => {
                                    return (
                                        <tr><td>{item}</td></tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </FormGroup>
                </Form>
            )
        }
    }

    return (
        <>
            <Col md="10">
                <Form className="bg-light p-4" onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="sourceLanguage">Source Language</Label>
                        <Select name="sourceLanguage" id="sourceLanguage" options={languages} onChange={(value) => setData({ ...data, sourceLanguage: value.value })}></Select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="targetLanguages">Target Languages</Label>
                        <Select name="targetLanguages" id="targetLanguages" options={languages} onChange={(value) => setTargetLanguages(value)} isMulti></Select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="translateText">Text to Translate</Label>
                        <Input type="textarea" name="translateText" id="translateText" onChange={(text) => setToTranslateData(text.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button>Translate</Button>
                    </FormGroup>
                </Form>

                {displayResults()}
            </Col>

        </>

    )
}