# ichild
Realm.open({}).then(realm => {
    console.log("Realm is located at: " + realm.path);
});
adb pull /data/data/com.ichild/files/default.realm
