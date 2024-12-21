import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import CardButton from '@/components/basic/cardButton';
import { Link } from 'expo-router';

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/wieza.jpg')}
                    style={styles.reactLogo}
                />
            }>
            <Link href={"/parter"}>
                <CardButton title='Map' iconName={'map'} />
            </Link>
            <Link href={"/tour"}>
                <CardButton title='Audioguider' iconName={'headphones'} />
            </Link>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    }
});
