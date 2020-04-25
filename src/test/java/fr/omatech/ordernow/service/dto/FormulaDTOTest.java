package fr.omatech.ordernow.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.omatech.ordernow.web.rest.TestUtil;

public class FormulaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormulaDTO.class);
        FormulaDTO formulaDTO1 = new FormulaDTO();
        formulaDTO1.setId(1L);
        FormulaDTO formulaDTO2 = new FormulaDTO();
        assertThat(formulaDTO1).isNotEqualTo(formulaDTO2);
        formulaDTO2.setId(formulaDTO1.getId());
        assertThat(formulaDTO1).isEqualTo(formulaDTO2);
        formulaDTO2.setId(2L);
        assertThat(formulaDTO1).isNotEqualTo(formulaDTO2);
        formulaDTO1.setId(null);
        assertThat(formulaDTO1).isNotEqualTo(formulaDTO2);
    }
}
