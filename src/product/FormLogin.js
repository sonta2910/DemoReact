import {Formik} from "formik";

export function FormLogin(){
    return(
        <div>
            <Formik initialValues={
                {
                email: '',
                password: ''
            }
            } onSubmit={(values)=> {
            }
            }>

            </Formik>
        </div>
    )
}