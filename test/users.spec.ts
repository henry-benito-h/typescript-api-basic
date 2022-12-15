
import { fail } from 'assert';
import { expect } from 'chai';
import appConstant from "../src/config/axios-constant";
import reqresConstant from "../src/config/reqres-constant";

const axios = require('axios').default;
axios.defaults.baseURL = appConstant.BASE_URL;

describe('User actions from reqres.in', () => {

    it('Should get all users', async () => {
        const response = await axios.get(reqresConstant.LIST_USERS);
        expect(response.data.data, "response should not be empty").not.to.be.empty
        expect(response.data.page).to.equal(1)
        expect(response.data.per_page).to.equal(6)
        expect(response.data.total).to.equal(12)
    });

    it('Should get user with id 2', async () => {
        const response = await axios.get(reqresConstant.SINGLE_USER(2));
        expect(response.data.data, "response should not be empty").not.to.be.empty
        expect(response.data.data.id, `data id is ${response.data.id}`).to.equal(2)
        expect(response.data.data.last_name).to.equal('Weaver')
    });

    it('Should create a new user', async () => {
        let newUser = {
            "name": "morpheus",
            "job": "leader"
        }
        try {
            const response = await axios.post(reqresConstant.CREATE_USER, newUser);
            expect(response.data, "response should not be empty").not.to.be.empty
            expect(response.data.name, `data name is ${response.data.name}`).to.equal(newUser.name)
            expect(response.data.id, `data id is ${response.data.id}`).is.not.equal('0');
            expect(response.data.createdAt, `data created is ${response.data.createdAt}`).not.to.be.empty


            await axios.get(reqresConstant.SINGLE_USER(response.data.id), {
                validateStatus: function (status: number) {
                    expect(status).is.eq(404);
                    return true;
                }
            })
        } catch (error: any) {
            fail(error);
        }
    });
});