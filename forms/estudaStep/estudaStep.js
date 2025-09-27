var currentStep = 1;
var totalSteps = 0;

function openMultiStepModal() {
    var modalContent = $('#multiStepFormContent').html();

    FLUIGC.modal({
        title: 'Formulário Multi-Step',
        content: modalContent,
        id: 'fluig-multi-step-modal',
        size: 'full',
        actions: [{ 'label': 'Fechar', 'autoClose': true }]
    }, function () {
        currentStep = 1;

        // Conta steps dinamicamente
        totalSteps = $('#fluig-multi-step-modal .step-content').length;

        updateStepUI();

        $('#fluig-multi-step-modal #nextButton').click(handleNext);
        $('#fluig-multi-step-modal #prevButton').click(handlePrev);
        $('#fluig-multi-step-modal #multiStepForm').on('submit', handleSubmit);
    });
}

function handleNext() {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepUI();
        }
    } else {
        FLUIGC.toast({
            title: 'Atenção:',
            message: 'Preencha todos os campos obrigatórios do passo ' + currentStep,
            type: 'danger'
        });
    }
}

function handlePrev() {
    if (currentStep > 1) {
        currentStep--;
        updateStepUI();
    }
}

function updateStepUI() {
    $('#fluig-multi-step-modal .step-content').hide();
    $('#fluig-multi-step-modal #step-' + currentStep).show();

    $('#fluig-multi-step-modal #stepIndicator li').removeClass('active');
    $('#fluig-multi-step-modal #stepIndicator li[data-step="' + currentStep + '"]').addClass('active');

    $('#fluig-multi-step-modal #prevButton').toggle(currentStep > 1);
    $('#fluig-multi-step-modal #nextButton').toggle(currentStep < totalSteps);
    $('#fluig-multi-step-modal #submitButton').toggle(currentStep === totalSteps);
}

function validateStep(stepNumber) {
    var isValid = true;

    $('#fluig-multi-step-modal #step-' + stepNumber + ' input[required], #fluig-multi-step-modal #step-' + stepNumber + ' select[required]').each(function () {
        if ($(this).val().trim() === '') {
            isValid = false;
            $(this).closest('.form-group').addClass('has-error');
            $(".step-icon-" + stepNumber).removeClass('done').addClass('has-error');
        } else {
            $(this).closest('.form-group').removeClass('has-error');
        }
    });

    if (isValid) {
        $(".step-icon-" + stepNumber).removeClass('has-error').addClass('done');
    }

    return isValid;
}
