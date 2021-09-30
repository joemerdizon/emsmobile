import React, {useEffect, useState} from 'react';
import { ScrollView, View, TouchableOpacity, Platform, Alert } from 'react-native';
import { Text, TextInput} from 'react-native-paper'
import { styles } from '../addmember/styles'
import FormTextInput from '../../components/FormTextInput';
import { FormDatePicker } from '../../components/FormDatePicker';
import FormPicker from '../../components/FormPicker';
import { getAllBaragays, getAllClusters, getAllPrecincts, saveMember, getClusters, getPrecincts  } from '../../helpers/apiHelpers';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../global/functions';
import { StatusCode } from '../../constants/statuscode';
import Spinner from 'react-native-loading-spinner-overlay';



const errorSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    genderId: yup.number()
        .required(),
    address: yup.string().required('Address is required'),
    mobile: yup.string().required('Mobile No. is required'),
    //dob: yup.date().required('dob is required') 
})

export function ErrorText({error}) {
    return(
        <Text style={styles.errorText}>{error}</Text>
    )
}

export function AddMemberScreen() {

    /* use for options */
    const [baragayOptions, setBarangayOptions] = useState([]);
    const [clusterOptions, setClusterOptions] = useState([]);
    const [precinctOptions, setPrecinctOptions] = useState([]);

    /* user for data only */
    const [clusterData, setClusterData] = useState([]);
    const [precinctData, setPrecinctData] = useState([]);

    const [spinner, setSpinner] = useState(true);
    const [show, setShow] = useState(false);
    const genderOptions = [
        {
            label: "Male",
            value: 1
        },
        {
            label: "Female",
            value: 2
        },
    ]

    useEffect(() => {      
        fetchBarangayData();
        fetchClusterData(); 
        fetchPrecinctData();     
    },[])

    
    useEffect(() => {
        if(baragayOptions.length >= 1 && clusterData.length >= 1 && precinctData.length >= 1){
            setSpinner(!spinner);
        }
     },[baragayOptions, clusterData, precinctData]);

    const showMode = () => {
        setShow(!show);
    };

    const initialValues = {
        firstName: '',
        middleName: null,
        lastName: '',
        genderId: 1,
        address: '',
        emailAddress: null,
        dob: new Date(1598051730000),
        barangayId: null,
        clusterId: null,
        precinctId: null,
        school: '',
        gCash: '',
        votersId: null,
        mobile: '',
        isMember: true
    }
   
    async function handleSubmit(data){  
        setSpinner(true);     
        await saveMember(data).then(response => {
            if(response)
                setSpinner(false);
            if(response == StatusCode.Added) {
                Alert.alert(
                    "Succeful",
                    "Member has been successfuly added!",
                    [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            }
        }).catch(err => {
            Alert.alert(
                "Error",
                "There is an error on your request. Please contact administration.",
                [
                  { text: "OK", onPress: () => console.log(err) }
                ]
               )
        });  
    }

    async function fetchBarangayData() {
        await getAllBaragays()
            .then(response => {
                return JSON.parse(response)
            }).then(parseJson => {
                let arrObj = [];
                parseJson.data.map((barangayVm) => {
                    arrObj.push({label : barangayVm.name, value: barangayVm.id})
                });
                setBarangayOptions(arrObj);
            });
    }

    async function fetchClusterData() {
        await getClusters().then(response => {
                return JSON.parse(response)
            }).then(parseJson => {          
                let arrObj = [];
                parseJson.data.map((data) => {
                    arrObj.push({label : data.name, value: data.id, parentId: data.brgyId})
                });              
                setClusterData(arrObj);
            });
    }

    async function fetchPrecinctData() {
        await getPrecincts().then(response => {
            return JSON.parse(response)
        }).then(parseJson => {
            let arrObj = [];
            parseJson.data.map((data) => {
                arrObj.push({label : data.name, value: data.id, parentId: data.clusterId})
            });              
            setPrecinctData(arrObj);
        });
    }
    
    function handleBarangayChanged(brgyId) {
        setClusterOptions([]);
        setPrecinctOptions([]);

        if(clusterData && clusterData.length >= 1) {
            var options = clusterData.filter(x => x.parentId == brgyId);
            setClusterOptions(options)
        }
    }

    function handleClusterChanged(clusterId) {
        setPrecinctOptions([]);

        if(precinctData && precinctData.length >= 1) {
            var options = precinctData.filter(x => x.parentId == clusterId);
            setPrecinctOptions(options)
        }

    }
    

    return(
        <View style={styles.container}>
            <ScrollView>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Informations</Text>
                </View>
                <Formik
                    initialValues={initialValues}
                    validationSchema={errorSchema}
                    onSubmit={(values, actions) => {
                        handleSubmit(values);
                        actions.resetForm();

                    }}>
                    {(props) => (
                        <View style={styles.formCotainer}>
                            <FormTextInput
                                label='First Name'
                                isRequired
                                onChangeText={props.handleChange('firstName')}
                                value={props.values.firstName}
                                name='firstName'
                            />
                            <ErrorMessage name='firstName' render={msg => <ErrorText error={msg} />} />

                            <FormTextInput
                                label='Middle Name'
                                onChangeText={props.handleChange('middleName')}
                                value={props.values.middleName}
                            />  

                            <FormTextInput
                                label='Last Name'
                                isRequired
                                onChangeText={props.handleChange('lastName')}
                                value={props.values.lastName}
                                name='lastName'
                            />
                            <ErrorMessage name='lastName' render={msg => <ErrorText error={msg} />} />

                            {/* <FormDatePicker 
                                label='Birthday' 
                                placeholder='yyyy/mm/dd' 
                                value={props.values.dob}
                                name='dob'
                                onChange={(evt, itemValue) => props.setFieldValue('dob',itemValue )}
                                isRequired /> */}

                            {/*TODO Convert this to component*/}
                            <View style={{marginVertical: 4}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{color: '#b22222', fontSize: 13, fontWeight: 'bold'}}>* </Text>
                                    <Text style={{fontSize: 13, color: "#696969"}}>Birth Date</Text>
                                </View>  
                                <TextInput 
                                    mode='outlined'
                                    value={formatDate(props.values.dob)}
                                    outlineColor='#1e90ff' 
                                    onFocus={showMode} 
                                    style={styles.inputDatePicker}
                                    theme={{ colors: { primary: '#1e90ff',underlineColor:'transparent',}}}
                                />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={props.values.dob}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={(evt, itemValue) => {
                                            setShow(Platform.OS === 'ios');
                                            props.setFieldValue('dob', itemValue)
                                        }}
                                    />
                                )}

                            </View>                                       

                            <FormPicker 
                                label='Sex' 
                                items={genderOptions} 
                                onValueChange={itemValue => props.setFieldValue('genderId', itemValue)} 
                                selectedValue={props.values.genderId}
                                isRequired />

                            <FormTextInput
                                multiline
                                numberOfLines={4}
                                label='Address'
                                placeholder='House #/Street/Barangay/Municipality'
                                onChangeText={props.handleChange('address')}
                                value={props.values.address}
                                name='address'
                                isRequired
                            />
                            <ErrorMessage name='address' render={msg => <ErrorText error={msg} />} />

                            <FormTextInput
                                label='Email Address'
                                onChangeText={props.handleChange('emailAddress')}
                                value={props.values.emailAddress}
                            />

                            <FormTextInput
                                label='Mobile No.'
                                isRequired
                                onChangeText={props.handleChange('mobile')}
                                value={props.values.mobile}
                                name='mobile'
                            />
                            <ErrorMessage name='mobile' render={msg => <ErrorText error={msg} />} /> 
                    
                            <FormTextInput
                                label='Voters Id No.'
                                onChangeText={props.handleChange('votersId')}
                                value={props.values.votersId}
                            />

                            <FormPicker 
                                label='Barangay' 
                                items={baragayOptions} 
                                onValueChange={itemValue => 
                                    {
                                        handleBarangayChanged(itemValue);
                                        props.setFieldValue('barangayId', itemValue);
                                    }
                                } 
                                selectedValue={props.values.barangayId}
                                isRequired />

                            <FormPicker 
                                label='Cluster' 
                                items={clusterOptions} 
                                onValueChange={itemValue => 
                                    {
                                        handleClusterChanged(itemValue);
                                        props.setFieldValue('clusterId', itemValue);
                                    }
                                } 
                                selectedValue={props.values.clusterId} />                  

                            <FormPicker 
                                label='Precint No.' 
                                items={precinctOptions} 
                                onValueChange={itemValue => props.setFieldValue('precinctId', itemValue)}
                                selectedValue={props.values.precinctId} />                    

                            <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                                <Text style={{fontSize: 16, color: 'white'}}>Register</Text>
                            </TouchableOpacity>

                        </View>                                                                           
                    )}
                </Formik>
            </ScrollView>            
        </View>            
    );
}

export default AddMemberScreen;