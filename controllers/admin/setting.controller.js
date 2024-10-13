const SettingGeneral=require('../../model/settings-general.model')

module.exports.general=async(req,res)=>{
    const settingGeneral=await SettingGeneral.findOne({})
    res.render('admin/pages/settings/general',{
        title:'Cài đặt chung',
        settingGeneral:settingGeneral
    })
}
module.exports.generalPatch=async(req,res)=>{
    const settingGeneral=await SettingGeneral.findOne({})

    if(settingGeneral){
        await SettingGeneral.updateOne({_id:settingGeneral.id},req.body)
    }
    else{
        const settingGeneral=new SettingGeneral(req.body)
        await settingGeneral.save()
    }
    res.redirect('back')
}