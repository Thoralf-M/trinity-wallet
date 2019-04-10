import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { navigator } from 'libs/navigation';
import balloonsAnimation from 'shared-modules/animations/language.json';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { getThemeFromState } from 'shared-modules/selectors/global';
import { Styling } from 'ui/theme/general';
import { width, height } from 'libs/dimensions';
import Header from 'ui/components/Header';
import SingleFooterButton from 'ui/components/SingleFooterButton';
import AnimatedComponent from 'ui/components/AnimatedComponent';
import { leaveNavigationBreadcrumb } from 'libs/bugsnag';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        flex: 1.6,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    midContainer: {
        flex: 2.4,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bottomContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    infoText: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: Styling.fontSize4,
        backgroundColor: 'transparent',
        textAlign: 'center',
        lineHeight: height / 30,
    },
    animation: {
        width: width / 1.35,
        height: width / 1.35,
    }
});

/** Onboarding Complete screen componenet */
class OnboardingComplete extends Component {
    static propTypes = {
        /** @ignore */
        t: PropTypes.func.isRequired,
        /** @ignore */
        theme: PropTypes.object.isRequired,
    };

    componentDidMount() {
        leaveNavigationBreadcrumb('OnboardingComplete');
    }

    onNextPress() {
        navigator.setStackRoot('loading');
    }

    render() {
        const { t, theme: { body, primary } } = this.props;
        return (
            <View style={[styles.container, { backgroundColor: body.bg }]}>
                <View style={styles.topContainer}>
                    <AnimatedComponent
                        animationInType={['fadeIn','slideInRight']}
                        animationOutType={['fadeOut', 'slideOutLeft']}
                        delay={400}
                    >
                        <Header textSize={Styling.fontSize5} textColor={body.color}>{t('walletReady')}</Header>
                    </AnimatedComponent>
                </View>
                <View style={styles.midContainer}>
                    <AnimatedComponent
                        animationInType={['fadeIn','slideInRight']}
                        animationOutType={['fadeOut', 'slideOutLeft']}
                        delay={200}
                        style={styles.animation}
                    >
                        <LottieView
                            ref={(animation) => {
                                this.animation = animation;
                            }}
                            source={balloonsAnimation}
                            loop
                            autoPlay
                            style={styles.animation}
                        />
                    </AnimatedComponent>
                </View>
                <View style={styles.bottomContainer}>
                    <AnimatedComponent
                        delay={0}
                        animationInType={['fadeIn','slideInRight']}
                        animationOutType={['fadeOut', 'slideOutLeft']}
                    >
                        <SingleFooterButton
                            onButtonPress={() => this.onNextPress()}
                            testID="languageSetup-next"
                            buttonStyle={{
                                wrapper: { backgroundColor: primary.color },
                                children: { color: primary.body },
                            }}
                            buttonText={t('openYourWallet')}
                        />
                    </AnimatedComponent>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: getThemeFromState(state),
});

export default withNamespaces(['onboardingComplete', 'global'])(connect(mapStateToProps)(OnboardingComplete));
