const videos = [
    {
        id: 0,
        title: 'Cyberpunk 2077 Trailer',
        publisher: 'CD Projeckt',
        thumbnail: './image/thumbnail0.jpg',
        video: './video/video0.mp4'
    },
    {
        id: 1,
        title: 'Nioh 2 Trailer',
        publisher: 'Koei Tecmo',
        thumbnail: './image/thumbnail1.jpg',
        video: './video/video1.mp4'
    },
    {
        id: 2,
        title: 'Outsiders Trailer',
        publisher: 'Square Enix',
        thumbnail: './image/thumbnail2.jpg',
        video: './video/video2.mp4'
    },
    {
        id: 3,
        title: 'Empire of Sin Trailer',
        publisher: 'Paradox Interactive',
        thumbnail: './image/thumbnail3.jpg',
        video: './video/video3.mp4'
    },
    {
        id: 4,
        title: 'The Cycle Trailer',
        publisher: 'Yager Development',
        thumbnail: './image/thumbnail4.jpg',
        video: './video/video4.mp4'
    },
    {
        id: 5,
        title: 'Watch Dogs: Legion Trailer',
        publisher: 'Ubisoft',
        thumbnail: './image/thumbnail5.jpg',
        video: './video/video5.mp4'
    },
    {
        id: 6,
        title: 'Crysis 3 Trailer',
        publisher: 'Electronic Arts',
        thumbnail: './image/thumbnail6.jpg',
        video: './video/video6.mp4'
    },
    {
        id: 7,
        title: 'Battlefield 5 Trailer',
        publisher: 'Electronic Arts',
        thumbnail: './image/thumbnail7.jpg',
        video: './video/video7.mp4'
    },
    {
        id: 8,
        title: 'Ghost of Tsushima Trailer',
        publisher: 'Sony Interactive Entertainment',
        thumbnail: './image/thumbnail8.jpg',
        video: './video/video8.mp4'
    },
    {
        id: 9,
        title: 'Devil May Cry 5 Trailer',
        publisher: 'Capcom',
        thumbnail: './image/thumbnail9.jpg',
        video: './video/video9.mp4'
    },
    {
        id: 10,
        title: 'Halo Infinite Trailer',
        publisher: 'Xbox Game Studios',
        thumbnail: './image/thumbnail10.jpg',
        video: './video/video10.mp4'
    },
    {
        id: 11,
        title: `Assassin's Creed Valhalla Trailer`,
        publisher: 'Ubisoft',
        thumbnail: './image/thumbnail11.jpg',
        video: './video/video11.mp4'
    },
    {
        id: 12,
        title: 'Hitman 3 Trailer',
        publisher: 'IO Interactive',
        thumbnail: './image/thumbnail12.jpg',
        video: './video/video12.mp4'
    },
    {
        id: 13,
        title: 'Apex Legends Trailer',
        publisher: 'Respawn Entertainment',
        thumbnail: './image/thumbnail13.jpg',
        video: './video/video13.mp4'
    }
];

const watchButton = document.querySelector('.button-watch-video');
const videoOverlay = document.querySelector('.video-overlay');
const VideoTitleText = document.querySelectorAll('.video-title-text');
const VideoCreatorText = document.querySelectorAll('.video-creator-text');
const VideoTotalTimeText = document.querySelectorAll('.video-total-time-text');
const overlayDefaultContent = document.querySelector('.container-default-status');
const overlayWatchingContent = document.querySelector('.container-watching-status');
const overlayPlaylistContent = document.querySelector('.container-playlist-status');
const expandButton = document.querySelector('.expand-button');
const stopButton = document.querySelector('.stop-button');
const playerContainer = document.querySelector('.video-player-container');
const pausePlayButtonContainer = document.querySelector('.pause-play-button-container');
const watchingPreviousButton = document.querySelector('.previous-button-container');
const watchingNextButton = document.querySelector('.next-button-container');
const videoContainer = document.querySelector('.video-container');
const cursorCircle = document.querySelector('.cursor-circle');
cursorCircle.style.display = 'none';
const watchingInfo = document.querySelector('.watching-info-container');
const progressBarBackground = document.querySelector('.progress-bar-background');
const volumeBarBackground = document.querySelector('.volume-bar-container');
const volumeBarPadding = document.querySelector('.volume-bar-padding');
const actualVolume = document.querySelector('.volume');
const actualProgress = document.querySelector('.progress');
const currentTime = document.querySelector('.current-time');
const playlistButton = document.querySelector('.playlist-button');
const volumeButton = document.querySelector('.volume-button');
const playlistBackButton = document.querySelector('.playlist-back-button');
const elementPreviousToPlaylist = document.querySelector('.playlist-previous-button-container');
const playlistPreviousButton = document.querySelector('.playlist-previous-button-icon');
const playlistNextButton = document.querySelector('.playlist-next-button-icon');
let playlistContainer;
let progressBarInterval;
let playerHoverInterval;
let currentVolume;
let volumePixels;

const player = {
    numberOfVideos: videos.length,
    previousVideo: null,
    currentVideo: videos[0],
    nextVideo: videos[1],
    playlist: {
        numberOfPages: parseInt(Math.ceil(videos.length / 12)),
        currentPage: 1,
    },
};

function handleWatchButtonClick() {
    if (player.previousVideo === null) {
        watchingPreviousButton.classList.add('nodisplay');
    }
    const barSize = parseInt(window.getComputedStyle(volumeBarBackground).getPropertyValue('height'));
    currentVolume = 1;
    videoContainer.volume = currentVolume;
    volumePixels = `${barSize}px`;
    actualVolume.style.height = volumePixels;
    videoOverlay.classList.toggle('needs-hover');
    overlayDefaultContent.classList.add('nodisplay');
    overlayWatchingContent.classList.remove('nodisplay');
    videoContainer.play();
    progressBarInterval = setInterval(updateProgressBar, 500);
}

function handleExpandButtonClick() {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFllscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (playerContainer.requestFullscreen) {
            playerContainer.requestFullscreen();
            videoContainer.style.width = '100%';
        } else if (playerContainer.mozRequestFullScreen) {
            playerContainer.mozRequestFullScreen();
            videoContainer.style.width = '100%';
        } else if (playerContainer.webkitRequestFullscreen) {
            playerContainer.webkitRequestFullscreen(playerContainer.ALLOW_KEYBOARD_INPUT);
            videoContainer.style.width = '100%';
        } else if (playerContainer.msRequestFullscreen) {
            playerContainer.msRequestFullscreen();
            videoContainer.style.width = '100%';
        }
    }
}

function handleStopButtonClick() {
    videoOverlay.classList.toggle('needs-hover');
    overlayDefaultContent.classList.remove('nodisplay');
    overlayWatchingContent.classList.add('nodisplay');
    videoContainer.load();
}

function handleCursorChangeOnHover(e) {
    if (playerHoverInterval) { clearTimeout(playerHoverInterval) }
    if (!overlayWatchingContent.classList.contains('nodisplay')) {
        videoOverlay.classList.add('needs-hover');
        videoOverlay.classList.remove('nodisplay');
        cursorCircle.classList.remove('nodisplay');
        playerHoverInterval = setTimeout(() => {
            videoOverlay.classList.remove('needs-hover');
            videoOverlay.classList.add('nodisplay');
            cursorCircle.classList.add('nodisplay');
        }, 2000);

    }
    if (e.target.classList.contains('control-button') || e.target.classList.contains('button-watch-video') || e.target.classList.contains('playlist-video')) {
        if (e.target.classList.contains('volume-button')) {
            volumeBarBackground.classList.remove('nodisplay');
            watchingNextButton.classList.add('nodisplay');
        }
        cursorCircle.textContent = 'Tap';
        cursorCircle.classList.add('cursor-hover');
        cursorCircle.classList.remove('opacitytwo');
    } else if (e.target.classList.contains('pause-play-button-container')) {
        cursorCircle.classList.remove('cursor-hover');
        cursorCircle.classList.remove('opacitytwo');
        if (videoContainer.currentTime && !videoContainer.paused && !videoContainer.ended) {
            cursorCircle.textContent = 'Pause';
        } else if (videoContainer.currentTime && videoContainer.paused && !videoContainer.ended) {
            cursorCircle.textContent = 'Play';
        }
    } else if (e.target.classList.contains('previous-button-container') || e.target.classList.contains('next-button-container')) {
        cursorCircle.classList.remove('opacitytwo');
        cursorCircle.classList.remove('cursor-hover');
        if (e.target.classList.contains('previous-button-container')) {
            cursorCircle.textContent = 'Prev.';
        } else {
            cursorCircle.textContent = 'Next';
        }
    } else {
        cursorCircle.classList.remove('cursor-hover');
        cursorCircle.classList.add('opacitytwo');
        cursorCircle.textContent = '';
    }
    const playerPosition = playerContainer.getBoundingClientRect();
    cursorCircle.style.display = '';
    let xPosition = e.pageX - playerPosition.left;
    let yPosition = e.pageY - playerPosition.top;
    cursorCircle.style.left = `${xPosition}px`;
    cursorCircle.style.top = `${yPosition}px`;
}

function handleCursorChangeOnLeave(e) {
    cursorCircle.style.display = 'none';
}

function handlePausePlayButtonCLick() {
    if (videoContainer.currentTime && !videoContainer.paused && !videoContainer.ended) {
        videoContainer.pause();
        cursorCircle.textContent = 'Play';
        clearInterval(progressBarInterval);
    } else if (videoContainer.currentTime && videoContainer.paused && !videoContainer.ended) {
        videoContainer.play();
        cursorCircle.textContent = 'Pause';
        progressBarInterval = setInterval(updateProgressBar, 500);
    }
}

function handleEndOfVideo() {
    //clearInterval(progressBarInterval);
    videoContainer.classList.add('nodisplay');
    if (player.nextVideo !== null) {
        loadVideo(player.nextVideo);
        videoContainer.play();
        progressBarInterval = setInterval(updateProgressBar, 500);
    } else {
        videoOverlay.classList.toggle('needs-hover');
        overlayDefaultContent.classList.remove('nodisplay');
        overlayWatchingContent.classList.add('nodisplay');
        overlayPlaylistContent.classList.add('nodisplay');
        cursorCircle.textContent = '';
        videoContainer.load();
    }
}

function handleFullScreenStyles(e) {
    const infoMarginBottom = window.getComputedStyle(watchingInfo).getPropertyValue('margin-bottom');
    watchingInfo.style.marginBottom = infoMarginBottom === '-20px' ? '0px' : '-20px';
    volumeBarBackground.classList.add('nodisplay');
    if (player.nextVideo !== null) {
        watchingNextButton.classList.remove('nodisplay');
    }
    updateProgressBar();
    updateVolumeBar()
}

function formatTime(time) {
    const date = new Date(time * 1000).toISOString();
    const minutes = date.substr(14, 2);
    const seconds = date.substr(17, 2)
    return { minutes, seconds };
}

function updateVolumeBar() {
    const barSize = parseInt(window.getComputedStyle(volumeBarBackground).getPropertyValue('height'));
    const progressInPixels = parseInt(videoContainer.volume * barSize);
    actualVolume.style.height = `${progressInPixels}px`;
}

function updateProgressBar() {
    const videoTime = Math.round(videoContainer.currentTime);
    const time = formatTime(videoTime);
    currentTime.textContent = `${time.minutes}:${time.seconds}`;
    const barSize = parseInt(window.getComputedStyle(progressBarBackground).getPropertyValue('width'));
    const progressInPixels = parseInt((videoContainer.currentTime * barSize) / videoContainer.duration);
    actualProgress.style.width = `${progressInPixels}px`;
}

function handleProgressBarClick(e) {
    const barSize = parseInt(window.getComputedStyle(progressBarBackground).getPropertyValue('width'));
    const leftMargin = progressBarBackground.getBoundingClientRect().left;
    const positionClicked = e.pageX - leftMargin;
    const newTime = (positionClicked * videoContainer.duration) / barSize;
    videoContainer.currentTime = newTime;
    actualProgress.style.width = `${positionClicked}px`;
}

function handleVolumeBarClick(e) {
    const barSize = parseInt(window.getComputedStyle(volumeBarBackground).getPropertyValue('height'));
    const bottomMargin = volumeBarBackground.getBoundingClientRect().bottom;
    let positionClicked = Math.floor(bottomMargin - e.pageY);
    if (positionClicked < 0) {
        positionClicked = 0;
    } else if (positionClicked > barSize) {
        positionClicked = barSize;
    }
    let newVolume = positionClicked / barSize;
    if (newVolume <= 0) {
        volumeButton.classList.add('volume-mute');
        newVolume = 0;
    } else if (newVolume > 1) {
        volumeButton.classList.remove('volume-mute');
        newVolume = 1;
    } else {
        volumeButton.classList.remove('volume-mute');
    }
    videoContainer.volume = newVolume;
    currentVolume = videoContainer.volume;
    actualVolume.style.height = `${positionClicked}px`;
    volumePixels = actualVolume.style.height;
    console.log(actualVolume.style.height, barSize);
}

function handleVolumeButtonClick(e) {
    if (e.target.classList.contains('volume-button')) {
        if (volumeButton.classList.contains('volume-mute')) {
            volumeButton.classList.remove('volume-mute');
            if (currentVolume === 0) {
                const barSize = parseInt(window.getComputedStyle(volumeBarBackground).getPropertyValue('height'));
                currentVolume = 1;
                volumePixels = `${barSize}px`;
                videoContainer.volume = currentVolume;
                actualVolume.style.height = volumePixels;
            }
            videoContainer.volume = currentVolume;
            actualVolume.style.height = volumePixels;
        } else {
            volumeButton.classList.add('volume-mute');
            currentVolume = videoContainer.volume;
            volumePixels = actualVolume.style.height;
            videoContainer.volume = 0;
            actualVolume.style.height = '0px';
        }
    }
}

function handlePlayerContainerClick(e) {
    if (e.target.classList.contains('volume-bar-padding') || e.target.classList.contains('volume-bar-container') || e.target.classList.contains('volume-bar')) {
        return;
    }
    if (!e.target.classList.contains('volume-button')) {
        volumeBarBackground.classList.add('nodisplay');
        if (player.nextVideo !== null) {
            watchingNextButton.classList.remove('nodisplay');
        }
    }
}

function handlePlaylistButtonClick() {
    videoContainer.pause();
    Array.from(playlistContainer.children).forEach(vid => {
        vid.classList.remove('current-video-overlay');
        vid.classList.remove('previous-video-overlay');
        vid.classList.remove('next-video-overlay');
        if (player.previousVideo !== null && player.previousVideo.id === Number(vid.id)) {
            vid.classList.add('previous-video-overlay');
        } else if (player.currentVideo !== null && player.currentVideo.id === Number(vid.id)) {
            vid.classList.add('current-video-overlay');
        } else if (player.nextVideo !== null && player.nextVideo.id === Number(vid.id)) {
            vid.classList.add('next-video-overlay');
        }
    });
    videoOverlay.classList.add('opacityeight');
    overlayWatchingContent.classList.add('nodisplay');
    overlayPlaylistContent.classList.remove('nodisplay');
}

function handlePlaylistBackButtonClick() {
    videoContainer.play();
    progressBarInterval = setInterval(updateProgressBar, 500);
    videoOverlay.classList.remove('opacityeight');
    overlayPlaylistContent.classList.add('nodisplay');
    overlayWatchingContent.classList.remove('nodisplay');
}

function updateVideoInfo(vid) {
    const title = vid.title.length > 40 ? `${vid.title.substr(0, 40)}~` : vid.title;
    const publisher = vid.publisher.length > 30 ? `${vid.publisher.substr(0, 30)}~` : vid.publisher;
    VideoTitleText.forEach(span => span.textContent = title);
    VideoCreatorText.forEach(span => span.textContent = publisher);
    const { minutes, seconds } = formatTime(videoContainer.duration);
    const realMinutes = parseInt(minutes) > 0 ? `${parseInt(minutes)} minutes` : '';
    const realSeconds = parseInt(seconds) > 0 ? `${parseInt(seconds)} seconds` : '';
    VideoTotalTimeText.forEach(span => span.textContent = `${realMinutes} ${realSeconds}`);
}

function updatePlayerVideos(vid) {
    const receivedVidIndex = videos.findIndex(vd => vd.id === vid.id);
    if ((receivedVidIndex > 0) && (receivedVidIndex < videos.length - 1)) {
        player.previousVideo = videos[receivedVidIndex - 1];
        player.currentVideo = videos[receivedVidIndex];
        player.nextVideo = videos[receivedVidIndex + 1];
    } else if (receivedVidIndex === 0) {
        player.previousVideo = null;
        player.currentVideo = videos[receivedVidIndex];
        player.nextVideo = videos[receivedVidIndex + 1];
    } else if (receivedVidIndex === (videos.length - 1)) {
        player.previousVideo = videos[receivedVidIndex - 1];
        player.currentVideo = videos[receivedVidIndex];
        player.nextVideo = null;
    }
}

function loadVideo(vid) {
    clearInterval(progressBarInterval);
    videoContainer.poster = vid.thumbnail;
    videoContainer.src = vid.video;
    videoContainer.load();
    actualProgress.style.width = '0px';
    currentTime.textContent = '00:00';
    updatePlayerVideos(vid);
    if (player.previousVideo === null) {
        watchingNextButton.classList.add('nodisplay');
    } else {
        watchingPreviousButton.classList.remove('nodisplay');
    }
    if (player.nextVideo === null) {
        watchingNextButton.classList.add('nodisplay');
    } else {
        watchingNextButton.classList.remove('nodisplay');
    }
}

function handleWatchingPreviousNextButtonCLick(e) {
    const isPrev = e.target.classList.contains('previous-button-container');
    const isNext = e.target.classList.contains('next-button-container');

    if (isPrev) {
        if (player.previousVideo !== null) {
            videoContainer.classList.add('nodisplay');
            loadVideo(player.previousVideo);
            if (player.previousVideo === null) {
                watchingPreviousButton.classList.add('nodisplay');
            }
        }
    } else if (isNext) {
        if (player.nextVideo !== null) {
            videoContainer.classList.add('nodisplay');
            loadVideo(player.nextVideo);
            if (player.nextVideo === null) {
                console.log('NANIII');
                watchingNextButton.classList.add('nodisplay');
            }
        }
    }
    videoContainer.play();
    progressBarInterval = setInterval(updateProgressBar, 500);
}

function handleLoadedData() {
    videoContainer.classList.remove('nodisplay');
}

function loadPlaylist() {
    playlistPreviousButton.classList.add('nodisplayforreal');
    playlistContainer = document.createElement('div');
    playlistContainer.addEventListener('click', handlePlaylistVideoClick);
    playlistContainer.classList.add('playlist-videos-container');
    videos.forEach(vid => {
        const video = document.createElement('div');
        video.id = vid.id;
        video.classList.add('playlist-video');
        if (vid.id > 11) {
            video.classList.add('nodisplayforreal');
        }
        video.style.backgroundImage = `url(${vid.thumbnail})`;
        if (player.previousVideo !== null && player.previousVideo.id === Number(vid.id)) {
            video.classList.add('previous-video-overlay');
        } else if (player.currentVideo !== null && player.currentVideo.id === Number(vid.id)) {
            video.classList.add('current-video-overlay');
        } else if (player.nextVideo !== null && player.nextVideo.id === Number(vid.id)) {
            video.classList.add('next-video-overlay');
        }
        playlistContainer.appendChild(video);
    });

    elementPreviousToPlaylist.insertAdjacentElement('afterend', playlistContainer);
}

function handlePlaylistPreviousNextButtonClick(e) {
    const isPrev = e.target.classList.contains('playlist-previous-button-icon');
    const isNext = e.target.classList.contains('playlist-next-button-icon');
    const playlistVideos = Array.from(playlistContainer.children);
    if (isPrev) {
        if (player.playlist.currentPage !== 1) {
            if (player.playlist.currentPage === 2) {
                playlistPreviousButton.classList.add('nodisplayforreal');
            }
            playlistVideos.forEach((vd, idx) => {
                if (idx > 11) {
                    vd.classList.add('nodisplayforreal');
                } else {
                    vd.classList.remove('nodisplayforreal');
                }
            });
            player.playlist.currentPage -= 1;
            if (player.playlist.currentPage < player.playlist.numberOfPages) {
                playlistNextButton.classList.remove('nodisplayforreal');
            }
        }
    } else if (isNext) {
        if (player.playlist.currentPage < player.playlist.numberOfPages) {
            if (player.playlist.currentPage === (player.playlist.numberOfPages - 1)) {
                playlistNextButton.classList.add('nodisplayforreal');
            }
            playlistVideos.forEach((vd, idx) => {
                if (idx < 12) {
                    vd.classList.add('nodisplayforreal');
                } else {
                    vd.classList.remove('nodisplayforreal');
                }
            });
            player.playlist.currentPage += 1;
            if (player.playlist.currentPage > 1) {
                playlistPreviousButton.classList.remove('nodisplayforreal');
            }
        }
    }
}

function handlePlaylistVideoClick(e) {
    if (e.target.classList.contains('playlist-video')) {
        const currentVideo = videos.find(vd => vd.id === Number(e.target.id));
        if (Number(e.target.id) === player.currentVideo.id && e.target.classList.contains('current-video-overlay')) {
            handlePlaylistBackButtonClick();
        } else {
            loadVideo(currentVideo);
            videoContainer.play();
            progressBarInterval = setInterval(updateProgressBar, 500);
            overlayPlaylistContent.classList.add('nodisplay');
            overlayWatchingContent.classList.remove('nodisplay');
        }
    }
}

playerContainer.addEventListener('mousemove', handleCursorChangeOnHover);
playerContainer.addEventListener('mouseleave', handleCursorChangeOnLeave);
playerContainer.addEventListener('click', handlePlayerContainerClick);
playerContainer.addEventListener('contextmenu', (e) => e.preventDefault());
pausePlayButtonContainer.addEventListener('click', handlePausePlayButtonCLick);
watchingPreviousButton.addEventListener('click', handleWatchingPreviousNextButtonCLick);
watchingNextButton.addEventListener('click', handleWatchingPreviousNextButtonCLick);
videoContainer.addEventListener('ended', handleEndOfVideo);
videoContainer.addEventListener('loadeddata', handleLoadedData);
videoContainer.addEventListener('loadedmetadata', () => {
    updateVideoInfo(player.currentVideo);
});
watchButton.addEventListener('click', handleWatchButtonClick);
expandButton.addEventListener('click', handleExpandButtonClick);
stopButton.addEventListener('click', handleStopButtonClick)
playlistButton.addEventListener('click', handlePlaylistButtonClick);
playlistBackButton.addEventListener('click', handlePlaylistBackButtonClick);
playlistPreviousButton.addEventListener('click', handlePlaylistPreviousNextButtonClick);
playlistNextButton.addEventListener('click', handlePlaylistPreviousNextButtonClick);
volumeButton.addEventListener('click', handleVolumeButtonClick);
progressBarBackground.addEventListener('click', handleProgressBarClick);
volumeBarBackground.addEventListener('click', handleVolumeBarClick);
document.addEventListener('fullscreenchange', handleFullScreenStyles);

loadPlaylist();
loadVideo(player.currentVideo);
