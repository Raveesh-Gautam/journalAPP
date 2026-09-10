import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Welcome() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.replace('/(tabs)/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Image source={require('@/assets/images/frontImg.png')} style={styles.image} resizeMode="contain" />
                    <Text style={styles.title}>
                        Start keeping{'\n'}
                        track of your{'\n'}
                        <Text style={styles.capsuleText}> life </Text>
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                        <Text style={styles.buttonText}>Join for free</Text>
                    </TouchableOpacity>
                </View>
                <Text>Already have an account? <Text style={styles.login}>Log in</Text></Text>
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
    title: {
        fontSize: 32,
        fontWeight: '800',
        lineHeight: 46,
        color: '#000000',
        letterSpacing: -0.5,
        textAlign: 'center',
        marginBottom: 24,
    },
    capsuleText: {
        borderWidth: 1.5,
        borderColor: '#000000',
        borderRadius: 20,
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
        height: 300,
        width: 380,
        alignSelf: 'center',
        marginBottom: 30,
    },
    login: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
    }
});