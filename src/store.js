import Vue from 'vue'
import Vuex from 'vuex'
import { getWeb3, checkMetamaskStatus } from './utils/index'

Vue.use(Vuex)
const bets = [{
  address: '0x97BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '9',
  ticker: 'eth'
},
{
  address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '8',
  ticker: 'link'
},
{
  address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '7',
  ticker: 'rep'
},
{
  address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '6',
  ticker: 'btc'
},
{
  address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '5',
  ticker: 'bch'
},
{
  address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '5',
  ticker: 'grin'
},
{
  address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '4',
  ticker: 'ada'
},
{
  address: '0x27BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '3',
  ticker: 'mkr'
},
{
  address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '2',
  ticker: 'xmr'
},
{
  address: '0x07BcBE5185A929FfBC493f3d7CF4692797029fF0',
  amount: '1',
  ticker: 'xlm'
}

]
export default new Vuex.Store({
  state: {
    web3: null,
    metamaskPolling: true,
    metamaskError: 'unlock',
    userBets: bets,
    polls: [
      {
        type: 'open',
        color: 'green',
        bets,
        barChartData: bets
      },
      {
        type: 'timelocked',
        color: 'blue',
        bets,
        barChartData: bets
      },
      {
        type: 'finished',
        color: 'red',
        bets,
        barChartData: bets
      }
    ]
  },
  mutations: {
    setWeb3 (state, { web3Instance }) {
      state.web3 = web3Instance
      state.metamaskPolling = true
    },
    setMetamaskError (state, { type }) {
      state.metamaskError = type
      state.metamaskPolling = true
    },
    removeMetamaskError (state) {
      state.metamaskError = false
    }
  },
  actions: {
    async checkMetamaskStatus (context) {
      const status = await checkMetamaskStatus(context.state.web3)
      if (status.error) {
        context.commit('setMetamaskError', { type: status.error })
      } else if (context.state.metamaskError) {
        context.commit('removeMetamaskError')
      }
    },

    async getWeb3 (context) {
      try {
        const { web3 } = await getWeb3()
        context.commit('setWeb3', { web3Instance: web3 })
        context.commit('removeMetamaskError')
      } catch (error) {
        context.commit('setMetamaskError', { type: 'install' })
      }
    },

    bet (context, { amount, ticker }) {
      console.log(`Betting ${amount} to ${ticker}`)
    },

    async fetchWeb3 (context) {}
  }
})
