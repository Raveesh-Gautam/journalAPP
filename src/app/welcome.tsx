import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// once an app load first time initialise
GoogleSignin.configure({
    webClientId: '801921960391-rii3ms3qkkk77v50gspsmlbvgetrf2ni.apps.googleusercontent.com',
});

export default function Welcome() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const idToken = userInfo.data?.idToken;
            if (!idToken) {
                throw new Error('No ID token received from Google');
            }

            const credential = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(auth, credential);

            console.log('Signed in as:', userCredential.user.email);
            router.replace('/(tabs)/home');
        } catch (error: any) {
            console.error('Google sign-in error:', error);
            Alert.alert('Sign-in failed', error.message || 'Kuch galat ho gaya, dobara try karo.');
        }
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
                        onPress={handleGoogleSignIn}
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

// Configuration: Build Credentials 1Ck3aqNlfc (Default)
// Keystore
// Type                JKS
// Key Alias           23615c50c62eaaa233a624f43fefd18d
// MD5 Fingerprint     F3:F2:13:A4:CF:B3:8B:F5:C8:44:34:41:08:FB:0F:77
// SHA1 Fingerprint    2A:8C:09:E9:E5:5F:F4:D6:FD:58:A7:7E:AF:BB:A5:8C:1A:E4:A0:DC
// SHA256 Fingerprint  C6:18:42:8B:E7:5B:DD:2B:A5:41:F5:38:CB:D3:F4:0A:69:36:74:BB:87:C1:A9:D8:1C:55:B8:CC:29:47:5A:46