//
//  main.m
//  Beaker
//
//  Created by Scott Draves on 6/25/14.
//  Copyright (c) 2014 ___FULLUSERNAME___. All rights reserved.
//

#import <Cocoa/Cocoa.h>

void launchJava()
{
    NSTask *task = [[NSTask alloc] init];
    [task setLaunchPath: @"/usr/bin/grep"];
}

int main(int argc, const char * argv[])
{
    launchJava();
    return NSApplicationMain(argc, argv);
}
