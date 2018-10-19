import Miner from 'Controllers/Miner';
import Device from './Device';
import MinerOptions from './MinerOptions';

const ElectronStore = window.require('electron-store');

const store = new ElectronStore();

/**
 * Get an array of Miners that are in the User Data Store.
 * @returns {Miner[]} The list of all miners
 */
function getMiners() {
  const miners = store.get('miners', []);
  console.log(miners);
  return miners.map(
    miner => new Miner(
      new Device(
        miner.device.platform,
        miner.device.type,
        miner.device.brand,
        miner.device.uuid,
      ),
      new MinerOptions(
        miner.options.algorithm,
      ),
      miner.name,
      miner.installPath,
    ),
  );
}

/**
 * Replaces the current miners array with an new one
 * @param {Array<Miner>} miners The new miners array
 */
function setMiners(miners) {
  store.set('miners', miners);
}

/**
 * Add a Miner to the User Data Store.
 * @param {Miner} miner The miner to add
 */
function addMiner(miner) {
  // Get the previous one
  const miners = store.get('miners', []);
  // Push new item
  miners.push(miner);
  // Set/Update store
  store.set('miners', miners);
}

export default {
  getMiners,
  setMiners,
  addMiner,
};