import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card , CardHeader, CardHeaderToolbar, CardBody, CardFooter} from '@material-ui/core'

export const EmailSubApp = (props) => {

    return (
        <div>
            
        </div>
    )
}

EmailSubApp.propTypes = {
    props: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSubApp)

//Side Card Navigation 

function SideCard(){
    return(
        <Card>
            <CardHeader title="">
                <CardHeaderToolbar>
                    <button> New Message</button>
                </CardHeaderToolbar>
                <CardBody>
                    <ul>
                        <li>Inbox</li>
                        <li>Marked</li>
                        <li>Darft</li>
                        <li>Sent</li>
                        <li>Trash</li>
                    </ul>
                    <ul>
                    <li>Custom Work</li>
                    <li>Progress</li>
                    <li>Parternship</li>
                    <li><button>Add Label +</button></li>
                    </ul>
                </CardBody>
            </CardHeader>
        </Card>
    );
}


function NewMessage(){
    return(
        <Card>
            <CardHeader title=""><CardHeaderToolbar><button>close</button> </CardHeaderToolbar> </CardHeader>
            <CardBody>
                <h2>To <input type="email"/></h2>
                <h2>Subject <input type="text"/></h2>
            </CardBody>
            <CardFooter><button>Send</button></CardFooter>
        </Card>
    );
}


function EmailListCardList(){
    
}