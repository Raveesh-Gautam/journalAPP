import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function Welcome() {
    const router = useRouter();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '801921960391-rii3ms3qkkk77v50gspsmlbvgetrf2ni.apps.googleusercontent.com',
    });

    // useEffect(() => {
    //     if (response?.type === 'success') {
    //         const { id_token } = response.params;
    //         const credential = GoogleAuthProvider.credential(id_token);

    //         signInWithCredential(auth, credential)
    //             .then((userCredential) => {
    //                 console.log('Signed in as:', userCredential.user.email);
    //                 router.replace('/(tabs)/home');
    //             })
    //             .catch((err) => {
    //                 console.error('Sign-in error:', err);
    //                 Alert.alert('Sign-in failed', err.message);
    //             });
    //     } else if (response?.type === 'error') {
    //         Alert.alert('Sign-in failed', 'Google sign-in cancel ya error ho gaya.');
    //     }
    // }, [response]);
    const handleGetStarted = () => {
        router.replace('/(tabs)/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.topSection}>
                    <Image source={require('../../assets/images/frontImg.png')} style={styles.image} resizeMode="contain" />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Start keeping{'\n'}track of your</Text>
                        <View style={styles.capsuleContainer}>
                            <Text style={styles.capsuleText}>life</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.button}
                        //onPress={() => promptAsync()}
                        onPress={handleGetStarted}
                        disabled={!request}
                    >
                        <Text style={styles.buttonText}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.footerText}>Already have an account? <Text style={styles.login}>Log in</Text></Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    topSection: {
        alignItems: 'center',
        width: '100%',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        lineHeight: 44,
        color: '#000000',
        letterSpacing: -0.5,
        textAlign: 'center',
    },
    capsuleContainer: {
        borderWidth: 1.5,
        borderColor: '#000000',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 2,
        marginTop: 6,
    },
    capsuleText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000000',
    },
    buttonWrapper: {
        width: '100%',
    },
    button: {
        backgroundColor: '#000000',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    image: {
        height: 280,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#666666',
    },
    login: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    }
});