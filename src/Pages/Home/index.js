import React from "react";
import { Form, Label, FormGroup, Input, Button } from "reactstrap";

export default function Home() {
    const [data, setData] = React.useState({
        toTranslate: [],
        targetLanguages: [],
        sourceLanguage: ""
    })

    const handleSubmit = () => {
        console.log("sumbit");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="translateText">Text to Translate</Label>
                <Input type="textarea" name="translateText" id="translateText" />
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
    )
}