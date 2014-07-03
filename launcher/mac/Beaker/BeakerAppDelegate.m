// Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#import "BeakerAppDelegate.h"

@implementation BeakerAppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    NSLog( @"Beaker App start JVM and launch browser");
    NSBundle* mainBundle = [NSBundle mainBundle];
    NSString* resourcePath = [mainBundle resourcePath];
    NSString* fullPath = [NSString stringWithFormat:@"%@/dist/beaker.command", resourcePath];
    NSString* javaPath = [NSString stringWithFormat:@"%@/jre1.7.0_60.jre/Contents/Home", resourcePath];
    setenv("JAVA_HOME", [javaPath UTF8String], TRUE);
    self.serverTask = [[NSTask alloc] init];
    [self.serverTask setLaunchPath:fullPath];
    [self.serverTask launch];
}

- (void) applicationWillTerminate:(NSNotification *)aNotification
{
    NSLog( @"Beaker App quit");
    [self.serverTask interrupt];
}

- (BOOL) applicationShouldOpenUntitledFile:(NSApplication *)sender
{
    return NO;
}

@end
