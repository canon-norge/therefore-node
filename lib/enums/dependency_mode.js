export var DependencyMode;
(function (DependencyMode) {
    DependencyMode[DependencyMode["Referenced "] = 0] = "Referenced ";
    DependencyMode[DependencyMode["SynchronizedRedundant"] = 1] = "SynchronizedRedundant";
    DependencyMode[DependencyMode["EditableRedundant"] = 2] = "EditableRedundant";
})(DependencyMode || (DependencyMode = {}));
