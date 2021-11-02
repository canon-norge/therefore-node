export var SignatureMode;
(function (SignatureMode) {
    SignatureMode[SignatureMode["NoSignature"] = 0] = "NoSignature";
    SignatureMode[SignatureMode["SignatureOnly"] = 1] = "SignatureOnly";
    SignatureMode[SignatureMode["SignatureAndTimestamp"] = 2] = "SignatureAndTimestamp";
})(SignatureMode || (SignatureMode = {}));
