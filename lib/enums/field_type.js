export var FieldType;
(function (FieldType) {
    FieldType[FieldType["StringField"] = 1] = "StringField";
    FieldType[FieldType["IntField "] = 2] = "IntField ";
    FieldType[FieldType["DateField"] = 3] = "DateField";
    FieldType[FieldType["LabelField"] = 4] = "LabelField";
    FieldType[FieldType["MoneyField"] = 5] = "MoneyField";
    FieldType[FieldType["LogicalField"] = 6] = "LogicalField";
    FieldType[FieldType["NumericCounter"] = 8] = "NumericCounter";
    FieldType[FieldType["TextCounter"] = 9] = "TextCounter";
    FieldType[FieldType["TableField"] = 10] = "TableField";
    FieldType[FieldType["CustomField"] = 99] = "CustomField";
})(FieldType || (FieldType = {}));
