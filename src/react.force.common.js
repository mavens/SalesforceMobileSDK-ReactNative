/*
 * Copyright (c) 2015-present, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * exec
 */
export const exec = (moduleIOSName, moduleAndroidName, moduleIOS, moduleAndroid, successCB, errorCB, methodName, args) => {
    if (moduleIOS) {
        const func = `${moduleIOSName}.${methodName}`;
        //console.log(`${func} called: ${JSON.stringify(args)}`);
        moduleIOS[methodName](
            args,
            (error, result) => {
                if (error) {
                    //console.log(`${func} failed: ${JSON.stringify(error)}`);
                    if (errorCB) errorCB(error);
                }
                else {
                    //console.log(`${func} succeeded`);
                    if (successCB) successCB(result);
                }
            });
    }
    // android
    else if (moduleAndroid) {
        const func = `${moduleAndroidName}.${methodName}`;
        //console.log(`${func} called: ${JSON.stringify(args)}`);
        moduleAndroid[methodName](
            args,
            result => {
                //console.log(`${func} succeeded`);
                if (successCB) {
                    successCB(safeJSONparse(result));
                };
            },
            error => {
                console.log(`${func} failed`);
                if (errorCB) errorCB(safeJSONparse(error));
            }
        );
    }
};

export const safeJSONparse = (str) => {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return str;
    }
};
