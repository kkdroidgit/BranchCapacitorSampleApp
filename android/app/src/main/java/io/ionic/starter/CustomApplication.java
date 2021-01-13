package io.ionic.starter;

import android.content.Context;

import androidx.multidex.MultiDex;
import androidx.multidex.MultiDexApplication;

import io.branch.referral.Branch;

public class CustomApplication extends MultiDexApplication {

    @Override
    public void onCreate() {
        super.onCreate();
        Branch.enableLogging();
        Branch.getAutoInstance(this);
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
