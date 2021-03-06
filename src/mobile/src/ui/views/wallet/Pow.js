import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { changePowSettings } from 'shared-modules/actions/settings';
import { setSetting } from 'shared-modules/actions/wallet';
import { getThemeFromState } from 'shared-modules/selectors/global';
import Fonts from 'ui/theme/fonts';
import { width, height } from 'libs/dimensions';
import InfoBox from 'ui/components/InfoBox';
import Toggle from 'ui/components/Toggle';
import SettingsBackButton from 'ui/components/SettingsBackButton';
import { Styling } from 'ui/theme/general';
import { leaveNavigationBreadcrumb } from 'libs/bugsnag';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomContainer: {
        flex: 1,
    },
    topContainer: {
        flex: 11,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoText: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: Styling.fontSize3,
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    toggleText: {
        fontFamily: Fonts.secondary,
        fontSize: Styling.fontSize4,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    toggleTextContainer: {
        justifyContent: 'center',
    },
});

/** Proof Of Work settings component */
class Pow extends Component {
    static propTypes = {
        /** @ignore */
        remotePoW: PropTypes.bool.isRequired,
        /** @ignore */
        t: PropTypes.func.isRequired,
        /** @ignore */
        changePowSettings: PropTypes.func.isRequired,
        /** @ignore */
        setSetting: PropTypes.func.isRequired,
        /** @ignore */
        theme: PropTypes.object.isRequired,
    };

    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        leaveNavigationBreadcrumb('Pow');
    }

    onChange() {
        this.props.changePowSettings();
    }

    render() {
        const { t, remotePoW, theme } = this.props;
        const textColor = { color: theme.body.color };

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={{ flex: 2 }} />
                        <InfoBox>
                            <Text style={[styles.infoText, textColor]}>{t('feeless')}</Text>
                            <Text style={[styles.infoText, textColor, { paddingTop: height / 50 }]}>
                                {t('localOrRemote')}
                            </Text>
                        </InfoBox>
                        <View style={{ flex: 1.1 }} />
                        <TouchableWithoutFeedback
                            onPress={this.onChange}
                            hitSlop={{ top: height / 55, bottom: height / 55, left: width / 70, right: width / 35 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.toggleTextContainer}>
                                    <Text style={[styles.toggleText, textColor, { marginRight: width / 45 }]}>
                                        {t('local')}
                                    </Text>
                                </View>
                                <Toggle
                                    active={remotePoW}
                                    bodyColor={theme.body.color}
                                    primaryColor={theme.primary.color}
                                    scale={1.3}
                                />
                                <View style={styles.toggleTextContainer}>
                                    <Text style={[styles.toggleText, textColor, { marginLeft: width / 45 }]}>
                                        {t('remote')}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flex: 1.5 }} />
                    </View>
                    <View style={styles.bottomContainer}>
                        <SettingsBackButton
                            theme={theme}
                            backFunction={() => this.props.setSetting('advancedSettings')}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state) => ({
    remotePoW: state.settings.remotePoW,
    theme: getThemeFromState(state),
});

const mapDispatchToProps = {
    changePowSettings,
    setSetting,
};

export default withNamespaces(['pow', 'global'])(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Pow),
);
