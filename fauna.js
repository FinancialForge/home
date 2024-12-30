async function RunQ(query) {
    try {
        const client = new Client({
            secret: 'fnAFz4ze8XAAQqRW5pLAUJqhjw1U_NxoysCiW6_V',
        });
        const result = await client.query(query);
        return JSON.stringify(result, null, 2);
    } catch (error) {
        return new Error(error.message);
    }
}

async function CreateUser(email, pass) {
  const query = fql`
    users.create({ data: { email: ${email}, pass: ${pass} } })
  `;
  return await RunQ(query);
}

async function GetUser(email) {
  const query = fql`
    users.getByEmail(${email}).first()
  `;
  return await RunQ(query);
}

async function UpdateUser(email, updates) {
  const query = fql`
    users.getByEmail(${email}).first()?.update({ data: ${updates} })
  `;
  return await RunQ(query);
}

async function ExistsUser(email) {
  const query = fql`
    users.getByEmail(${email}).exists()
  `;
  return await RunQ(query);
}

async function DeleteUser(email) {
  const query = fql`
    users.getByEmail(${email}).first()?.delete()
  `;
  return await RunQ(query);
}

console.log('LOADED FAUNA.JS FILE')
