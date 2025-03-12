"use client";

import { ref, onValue } from "firebase/database";
import { useState, useEffect, use } from "react";
import { database } from "./fireBaseConfig"; // Ensure this is your Firebase configuration file

import { CgPushChevronDownO } from "react-icons/cg";
import { TbCircuitVoltmeter } from "react-icons/tb";
import { MdEnergySavingsLeaf } from "react-icons/md";

export default function Home() {
  const [randomValue, setRandomValue] = useState<number>(0); // State to store the database value
  const [step, setStep] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [current, setCurrent] = useState(0)

  const minCurrent = 10
  const maxCurrent = 20


  // float current = minCurrent + ((voltage / referenceVoltage) * (maxCurrent - minCurrent));
  

  useEffect(() => {
    const valueRef = ref(database, "db/randomValue"); // Reference to your database node
    const unsubscribe = onValue(valueRef, (snapshot) => {
      const value = snapshot.val(); // Get the value from the snapshot
      setRandomValue(value); // Update the state with the database value
      
      
      
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (randomValue !== null) {
      setCurrent((minCurrent + ((randomValue/3.3)+(maxCurrent-minCurrent))))
      setEnergy(randomValue * current *0.2);
    }

    if(randomValue > 0.0001){
      setStep((prevValue) => prevValue + 1);
  
    }
  }, [randomValue]);


  

  const roundToDecimals = (num: number, decimalPlaces: number) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  };

  // const batteryLevel = Math.min((step / 100) * 100, 100);
  const batteryLevel = 2.1 + ((step * 0.3) / 700);
  // const batteryLevel = Math.min(2.1 + ((step * 0.3) / 700), 3);

  return (
    <div className="w-full h-[calc(100vh-156px)] bg-slate-50">
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-lg p-6">
              <div className="flex flex-row items-center gap-10">
                <div className="flex items-center gap-3">
                  <CgPushChevronDownO size={50} color="#ADD8E6" />
                  <div>
                    <h1 className="text-slate-800 text-xl font-extrabold tracking-wide mb-2">
                      Step Counter
                    </h1>
                    <p className="text-sm text-slate-400">
                      Counting step numbers...
                    </p>
                  </div>
                </div>

                <div className="ml-10 border border-slate-100 p-5 rounded-md">
                  <p className="font-bold text-xl text-blue-500">
                    {step !== null ? step : "Loading..."}
                    <span className="ml-2 text-sm text-slate-400">Counts</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex flex-row items-center gap-1">
                <div className="flex gap-3 items-center">
                  <TbCircuitVoltmeter size={60} color="#ADD8E6" />
                  <div>
                    <h1 className="text-slate-800 text-xl font-extrabold tracking-wide mb-2">
                      Impulse Voltage
                    </h1>
                    <p className="text-sm text-slate-400">
                      Reading currnet voltage...
                    </p>
                  </div>
                </div>
                <div className="ml-10 border border-slate-100 p-5 rounded-md">
                  <p className="font-bold text-xl text-blue-500">
                    {randomValue !== null ? randomValue : "Loading..."}
                    <span className="ml-2 text-sm text-slate-400">Volts</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex flex-row items-center gap-2">
                <div className="flex items-center gap-1">
                  <MdEnergySavingsLeaf size={50} color="#ADD8E6" />
                  <div>
                    <h1 className="text-slate-800 text-xl font-extrabold tracking-wide mb-2">
                      Generated Energy
                    </h1>
                    <p className="text-sm text-slate-400">
                      Calculated energy...
                    </p>
                  </div>
                </div>
                <div className="ml-10 border border-slate-100 p-5 rounded-md">
                  <p className={`font-bold text-xl text-blue-500`}>
                    {randomValue !== 0
                      ? roundToDecimals(energy, 2)
                      : "Loading..."}
                    <span className="ml-2 text-sm text-slate-400">uJ</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-slate-800 text-xl font-extrabold tracking-wide mb-2">
                Battery Charging
              </h1>
              <p className="text-sm text-slate-400">
                Monitoring battery voltage level...
              </p>
              <hr className="w-[95%] my-4" />
              <div className="flex items-center p-4 justify-center">
                <div className="bg-gray-200 w-[30%] h-[300px] rounded-lg flex flex-col-reverse items-center">
                  <div
                    style={{
                      height: `${(batteryLevel / 3) * 300}px`, // Map voltage to height
                    }}
                    className="bg-green-400 w-full text-center p-3 border border-gray-400 flex items-center justify-center"
                  >
                    <p className="text-gray-700 text-sm">{`${batteryLevel.toFixed(4)} V`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
