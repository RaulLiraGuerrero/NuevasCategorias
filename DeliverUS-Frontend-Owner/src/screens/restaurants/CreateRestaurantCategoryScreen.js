import { useState } from 'react'
import { createRestaurantCategory } from '../../api/RestaurantEndpoints'
import { Pressable, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateRestaurantCategoryScreen ({ navigation }) {
    const [backendErrors, setBackendErrors] = useState()
    const initialRestaurantValues = { name: null, createdAt: null, updatedAt:
        null }

        const validationSchema = yup.object().shape({
            name: yup
            .string()
            .max(50, 'Name too long')
            .required('Name is required')
        })
        const createCategory = async (values) => {
            setBackendErrors([])
            try {
                const createdCategory = await createRestaurantCategory(values)
                showMessage({
                    message: `Restaurant category ${createdCategory.name} succesfully
                    created`,
                    type: 'success',
                    style: GlobalStyles.flashStyle,
                    titleStyle: GlobalStyles.flashTextStyle
                })
                navigation.navigate('CreateRestaurantScreen', { dirty: true })
            } catch (err) {
                console.log(err)
                setBackendErrors(err.errors)
            }
        }
        return <Formik
        validationSchema={validationSchema}
        initialValues={initialRestaurantValues}
        onSubmit={createCategory}
        >
            {({ handleSubmit, setFieldValue, values }) => (
            <>
            <View style={{ alignItems: 'center' }}>
                <View style={{ width: '60%' }}>
                    <InputItem
                    name='name'
                    label='Name:'
                    />
                    <Pressable
                    onPress={handleSubmit}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                            ? GlobalStyles.brandSuccessTap
                            : GlobalStyles.brandSuccess
                        },
                        styles.button
                        ]}>
                            <View style={[{ flex: 1, flexDirection: 'row', justifyContent:
                            'center' }]}>
                                <MaterialCommunityIcons name='content-save' color={'white'}
                                size={20}/>
                                <TextRegular textStyle={styles.text}>
                                    Save
                                    </TextRegular>
                                    </View>
                                    </Pressable>
                                    {backendErrors &&
                                    backendErrors.map((error, index) => <TextError
                                key={index}>{error.msg}</TextError>)
                                    }
                                    </View>
                                </View>
                                </>
                                )}
                                    </Formik>
                                    }
                                    const styles = StyleSheet.create({
                                        button: {
                                            borderRadius: 8,
                                            height: 40,
                                            padding: 10,
                                            width: '100%',
                                            marginTop: 20,
                                            marginBottom: 20
                                        }
                                     })
                