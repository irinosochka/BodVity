import {
    StyleSheet, View, Text, Image
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import {useIsFocused} from "@react-navigation/native";
import {retrievePillsForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import moment from "moment";

const styles = StyleSheet.create({
    progressWrapper: {
        height: 100,
        borderRadius: 15,
        padding: 20,
        backgroundColor: colors.primary,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progressTextWrapper: {

    },
    txtTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
    },
    txtSubtitle: {
        paddingTop: 5,
        fontSize: 14,
        fontWeight: "300",
        color: colors.white,
        width: 200,
    },
    iconWrapper: {
        paddingLeft: 20,
    },
    imgDoctor: {
        width: 130,
        height: 130,
    },
});

function ProgressComponents() {
    const [pillItems, setPillItems] = useState([]);
    const isFocused = useIsFocused();
    // const [missedPills, setMissedPills] = useState(true)
    const [pillQuantity, setPillQuantity] = useState(0);
    const [pillCompleted,setPillCompleted] = useState(0);
    let allPill;
    let completedPill;
    let missedPills = true;

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const newPills = await retrievePillsForUser(auth.currentUser.uid);
                setPillItems(newPills);
            }
            await doesMissed();
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    useEffect(() => {
        const fetchData = async () => {
            await doesMissed();
        }
    }, []);


    const doesMissed = async () => {
        allPill = pillItems.filter(pillItem =>
            (moment.unix(pillItem.time.seconds).format('DD-MMM-YYYY') === moment(new Date()).format('DD-MMM-YYYY'))).length;
        completedPill = pillItems.filter(pillItem =>
            (moment.unix(pillItem.time.seconds).format('DD-MMM-YYYY') === moment(new Date()).format('DD-MMM-YYYY'))
        ).filter(pillItem => pillItem.completed).length;

        missedPills = allPill !== completedPill;

        console.log(allPill);
        console.log(completedPill);
    }

    return (
        <View>
            { (allPill === completedPill) ?
                <View style={styles.progressWrapper}>
                    <View style={styles.progressTextWrapper}>
                        <Text style={styles.txtTitle}>Pay attention!</Text>
                        <Text style={styles.txtSubtitle}>You have missed medication.</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image style={styles.imgDoctor}
                               source={require('../../../assets/doctor-2.png')}
                        />
                    </View>
                </View>

                :

                <View style={styles.progressWrapper}>
                    <View style={styles.progressTextWrapper}>
                        <Text style={styles.txtTitle}>Keep it up! {allPill} {completedPill}</Text>
                        <Text style={styles.txtSubtitle}>You haven't missed a single medication. Well done.</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image style={styles.imgDoctor}
                               source={require('../../../assets/doctor.png')}
                        />
                    </View>
                </View>

            }
        </View>

        // {missedPills ?
        //         <View style={styles.progressWrapper}>
        //             <View style={styles.progressTextWrapper}>
        //                 <Text style={styles.txtTitle}>Keep it up!</Text>
        //                 <Text style={styles.txtSubtitle}>You haven't missed a single medication. Well done.</Text>
        //             </View>
        //             <View style={styles.iconWrapper}>
        //                 <Image style={styles.imgDoctor}
        //                        source={require('../../../assets/doctor.png')}
        //                 />
        //             </View>
        //         </View>
        //
        //         :
        //
        //         <View style={styles.progressWrapper}>
        //             <View style={styles.progressTextWrapper}>
        //                 <Text style={styles.txtTitle}>Keep it up!</Text>
        //                 <Text style={styles.txtSubtitle}>You haven't missed a single medication. Well done.</Text>
        //             </View>
        //             <View style={styles.iconWrapper}>
        //                 <Image style={styles.imgDoctor}
        //                        source={require('../../../assets/doctor.png')}
        //                 />
        //             </View>
        //         </View>
        // }
    );
}

export default ProgressComponents;
