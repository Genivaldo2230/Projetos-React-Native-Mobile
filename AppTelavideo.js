import React, { useEffect, useState } from 'react';
import { Text, View, Carousel, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-snap-carousel';
import youtube from 'react-native-webview';

const YouTubeCarousel = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            // faz a busca por vídeos no YouTube
            const apiKey = 'YOUR_API_KEY';
            ('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');
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=programação&type=video&maxResults=10`
            );
            const result = await response.json();

            // transforma os resultados em um formato de vídeo
            const videos = result.items.map((item) => ({
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.default.url,
                videoId: item.id.videoId,
            }));

            setVideos(videos);
        };

        fetchVideos();
    }, []);

    const renderVideo = ({ item }) => {
        const videoUrl = `https://www.youtube.com/embed/${item.videoId}`;

        return <WebView source={{ uri: videoUrl }} style={styles.video} />;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vídeos sobre programação no YouTube</Text>
            <Carousel
                data={videos}
                renderItem={renderVideo}
                sliderWidth={350}
                itemWidth={300}
                loop={true}
                autoplay={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    video: {
        flex: 1,
        height: 200,
    },
});

export default YouTubeCarousel;
