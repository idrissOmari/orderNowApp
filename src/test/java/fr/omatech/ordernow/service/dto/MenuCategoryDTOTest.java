package fr.omatech.ordernow.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.omatech.ordernow.web.rest.TestUtil;

public class MenuCategoryDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MenuCategoryDTO.class);
        MenuCategoryDTO menuCategoryDTO1 = new MenuCategoryDTO();
        menuCategoryDTO1.setId(1L);
        MenuCategoryDTO menuCategoryDTO2 = new MenuCategoryDTO();
        assertThat(menuCategoryDTO1).isNotEqualTo(menuCategoryDTO2);
        menuCategoryDTO2.setId(menuCategoryDTO1.getId());
        assertThat(menuCategoryDTO1).isEqualTo(menuCategoryDTO2);
        menuCategoryDTO2.setId(2L);
        assertThat(menuCategoryDTO1).isNotEqualTo(menuCategoryDTO2);
        menuCategoryDTO1.setId(null);
        assertThat(menuCategoryDTO1).isNotEqualTo(menuCategoryDTO2);
    }
}
