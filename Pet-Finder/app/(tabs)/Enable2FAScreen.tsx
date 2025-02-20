import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import QRCode from "react-native-qrcode-svg";
import * as Crypto from "expo-crypto";

export default function Enable2FAScreen() {
    const [totpSecret, setTotpSecret] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const generateTOTPSecret = async () => {
        const secret = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, Date.now().toString());
        setTotpSecret(secret);

        const { error } = await supabase
            .from("users")
            .update({ two_factor_enabled: true, two_factor_method: "totp", totp_secret: secret })
            .eq("id", user.id);

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "2FA Enabled! Scan the QR code with Google Authenticator.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Enable Two-Factor Authentication</Text>
            <TouchableOpacity
                onPress={generateTOTPSecret}
                style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
            >
                <Text style={{ color: "white" }}>Enable TOTP 2FA</Text>
            </TouchableOpacity>
            {totpSecret && (
                <>
                    <Text style={{ marginTop: 20 }}>Scan this QR Code:</Text>
                    <QRCode value={totpSecret} size={200} />
                </>
            )}
        </View>
    );
}
