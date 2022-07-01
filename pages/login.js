import LoginRegistration from "../components/LoginRegistration";
import UsersAPI from "../lib/api/Users";

export default function loginPage(users) {

    return (
        <div>
                <LoginRegistration type={"login"} users={users}/>
        </div>
    )
}

export async function getStaticProps(){
    let users;
    try{
        users = await UsersAPI.readAll();

    } catch (e){
        users = null;
    }
    return{
        props: { users }, revalidate: 30
    }
}