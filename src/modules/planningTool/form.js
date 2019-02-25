import React, {Component} from 'react';
import { Button, Form } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styles from './planningTool.scss';
import InputField from '../../components/InputField/inputField';
import InputSelect from '../../components/InputField/InputSelect';

class PlannerForm extends Component {
    render() {
        return(
            <Form style={{margin: '0 3rem', zIndex: '10000'}} className="position-relative">
                <InputSelect placeHolder="Type of Event" id="selectEvent"/>

                <InputField placeHolder="When is the event?" id="text"/>
                <InputField placeHolder="How much is the budget?" id="budget"/>
                <InputField placeHolder="Zipcode?" id="zipcode"/>
                <InputField placeHolder="Best email to reach you?" id="email"/>
                <InputField placeHolder="You name please.." id="clientName"/>

                <div className="text-center mt-5">
                    <Button color="danger" className={styles.formButton}>Plan Your Party</Button>
                </div>
            </Form>
        );
    }
}

export default PlannerForm;